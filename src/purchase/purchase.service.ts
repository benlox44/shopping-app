import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import * as amqp from 'amqplib/callback_api';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

export interface WebpayResponse {
  url: string;
  token: string;
}

export interface WebpayReturnResponse {
  status: string;
}

@Injectable()
export class PurchaseService {
  private userEmail: string | null = null;
  private userName: string | null = null;
  private courseIds: number[] = [];
  private userId: number | null = null;
  private coursePrices: number[] = [];
  private orderID: number | null = null;

  constructor(private readonly configService: ConfigService) {}

  async initTransaction(userId: number, totalAmount: number): Promise<WebpayResponse | null> {
    try {
      this.userId = userId;
      console.log('User ID from token:', this.userId);

      const userDetails = await this.getUserDetails(this.userId);
      console.log('Detalles del usuario obtenidos:', userDetails);

      this.userEmail = userDetails.email;
      this.userName = userDetails.name;
      this.courseIds = userDetails.courseIds || [];
      this.coursePrices = userDetails.price || [];

      const buyOrder = Math.floor(Math.random() * 100000);
      this.orderID = buyOrder; 
      const sessionId = Math.floor(Math.random() * 100000);
      const returnUrl = `http://localhost:3003/purchase/return`;


      const data = JSON.stringify({
        buy_order: buyOrder,
        session_id: sessionId,
        amount: Math.round(totalAmount),
        return_url: returnUrl,
      });

      const method = 'POST';
      const type = 'sandbox';
      const endpoint = '/rswebpaytransaction/api/webpay/v1.0/transactions';

      const response = await this.getWs(data, method, type, endpoint);
      return response;
    } catch (error) {
      console.error('Error al iniciar la transacción:', error);
      throw new HttpException('Error iniciando la transacción', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async returnTransaction(token: string): Promise<boolean> {
    if (!token) {
      throw new HttpException('No se recibió el token de Webpay', HttpStatus.BAD_REQUEST);
    }

    const method = 'PUT';
    const type = 'sandbox';
    const endpoint = `/rswebpaytransaction/api/webpay/v1.0/transactions/${token}`;

    const response: WebpayReturnResponse | null = await this.getWs(null, method, type, endpoint);

    if (response && response.status === 'AUTHORIZED') {
      if (this.userEmail && this.userName && this.courseIds.length > 0 && this.userId) {
        console.log('Detalles del usuario para enviar correo:', {
          email: this.userEmail,
          name: this.userName,
          courseIds: this.courseIds,
        });

        try {
          const courseDetails = await this.getCourseTitles(this.courseIds);

          const courseTitles = courseDetails.map(course => course.title);
          this.coursePrices = courseDetails.map(course => course.price);
          const totalPrice = courseDetails.reduce((sum, course) => sum + course.price, 0);
          console.log('Course Titles:', courseTitles);
          console.log('Total Price:', totalPrice);

          await this.sendEmail(this.userEmail, this.userName, courseTitles, totalPrice);

          await this.sendPurchaseToUsers(this.userId, this.courseIds,this.orderID, this.coursePrices );
          
        } catch (error) {
          console.error('Error al obtener los títulos de los cursos o enviar el correo:', error);
          throw new HttpException('Error al obtener los títulos de los cursos. Por favor, intenta nuevamente más tarde.', HttpStatus.SERVICE_UNAVAILABLE);
        }
      } else {
        console.error('No se encontraron los detalles del usuario o el carrito almacenados.');
        throw new HttpException('Detalles del usuario o carrito no disponibles', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      return true;
    } else {
      return false;
    }
  }

  private async getUserDetails(userId: number): Promise<any> {
    return new Promise((resolve, reject) => {
      amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
          reject(error0);
          return;
        }

        connection.createChannel((error1, channel) => {
          if (error1) {
            reject(error1);
            return;
          }

          const queue = 'user_details_queue';
          const correlationId = this.generateUuid();

          channel.assertQueue('', { exclusive: true }, (error2, q) => {
            if (error2) {
              reject(error2);
              return;
            }

            channel.consume(
              q.queue,
              (msg) => {
                if (msg.properties.correlationId === correlationId) {
                  const userDetails = JSON.parse(msg.content.toString());
                  console.log('User ID from getUserDetails:', userId);
                  console.log('Course IDs from getUserDetails:', userDetails.courseIds);
                  resolve(userDetails);
                  setTimeout(() => {
                    connection.close();
                  }, 500);
                }
              },
              { noAck: true },
            );

            channel.sendToQueue(queue, Buffer.from(JSON.stringify({ userId })), {
              correlationId,
              replyTo: q.queue,
            });
          });
        });
      });
    });
  }

  private async getCourseTitles(courseIds: number[]): Promise<{ title: string; price: number }[]> {
    return new Promise((resolve, reject) => {
      amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
          reject(error0);
          return;
        }
  
        connection.createChannel((error1, channel) => {
          if (error1) {
            reject(error1);
            return;
          }
  
          const queue = 'purchase_course_queue';
          const correlationId = this.generateUuid();
  
          channel.assertQueue('', { exclusive: true }, (error2, q) => {
            if (error2) {
              reject(error2);
              return;
            }

            const timeout = setTimeout(() => {
              reject(new Error('Timeout al obtener los detalles de los cursos.'));
              connection.close();
            }, 5000);
  
            channel.consume(
              q.queue,
              (msg) => {
                if (msg.properties.correlationId === correlationId) {
                  clearTimeout(timeout);
                  const courseDetails = JSON.parse(msg.content.toString());
                  resolve(courseDetails);
                  setTimeout(() => {
                    connection.close();
                  }, 500);
                }
              },
              { noAck: true },
            );
  
            channel.sendToQueue(queue, Buffer.from(JSON.stringify({ courseIds })), {
              correlationId,
              replyTo: q.queue,
            });
          });
        });
      });
    });
  }
  
  
  private generateUuid() {
    return Math.random().toString() + Math.random().toString() + Math.random().toString();
  }

  private async getWs(data: any, method: string, type: string, endpoint: string): Promise<any> {
    const baseUrl = type === 'live' ? 'https://webpay3g.transbank.cl' : 'https://webpay3gint.transbank.cl';
    const TbkApiKeyId = this.configService.get<string>('TBK_API_KEY_ID');
    const TbkApiKeySecret = this.configService.get<string>('TBK_API_KEY_SECRET');

    try {
      const response: AxiosResponse<any> = await axios({
        method: method,
        url: baseUrl + endpoint,
        headers: {
          'Tbk-Api-Key-Id': TbkApiKeyId,
          'Tbk-Api-Key-Secret': TbkApiKeySecret,
          'Content-Type': 'application/json',
        },
        data: data,
      });

      return response.data;
    } catch (error) {
      console.error('Error al conectar con Webpay:', error);
      return null;
    }
  }

  private async sendEmail(email: string, name: string, courseTitles: string[], totalPrice: number): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('GMAIL_USER'),
        pass: this.configService.get<string>('GMAIL_PASS'),
      },
    });
  
    const courseList = courseTitles.map(title => `• ${title}`).join('\n');
  
    const mailOptions = {
      from: 'NetDesignChile@gmail.com',
      to: email,
      subject: 'Compra exitosa',
      text: `Hola ${name},\n\nTu compra ha sido realizada con éxito. Los cursos adquiridos son:\n\n${courseList}\n\nEl precio total es: $${totalPrice}.\n\n¡Gracias por confiar en nosotros!\n\nSaludos,\nTu equipo.`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Correo enviado a ${email}`);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  } 

  private async sendPurchaseToUsers(userId: number, courseIds: number[], orderId: number, coursePrices: number[]): Promise<void> {
    return new Promise((resolve, reject) => {
      amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
          console.error('Error al conectar a RabbitMQ:', error0);
          reject(error0);
          return;
        }
  
        connection.createChannel((error1, channel) => {
          if (error1) {
            console.error('Error al crear el canal de RabbitMQ:', error1);
            reject(error1);
            return;
          }
  
          const queue = 'purchase_to_user_queue';
          const message = { userId, courseIds, coursePrices, orderId };
  
          channel.assertQueue(queue, { durable: true });
          channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
            persistent: true,
          });
  
          console.log('Mensaje enviado a la cola de usuarios:', message);
          resolve();
          setTimeout(() => {
            connection.close();
          }, 500);
        });
      });
    });
  }  
}
