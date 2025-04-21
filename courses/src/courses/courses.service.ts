import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './course.entity';
import * as amqp from 'amqplib/callback_api';

@Injectable()
export class CoursesService implements OnModuleInit {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async onModuleInit() {
    this.listenForCourseRequests();
    this.listenForPurchaseRequests(); // Escuchar las solicitudes de PurchaseService
  }

  private listenForCourseRequests() {
    amqp.connect('amqp://localhost', (error0, connection) => {
      if (error0) {
        throw error0;
      }

      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }

        const queue = 'course_queue';

        channel.assertQueue(queue, { durable: false });

        channel.consume(queue, async (msg) => {
          if (!msg) return;

          const { courseIds } = JSON.parse(msg.content.toString());
          try {
            const courses = await this.findByIds(courseIds);

            const responseQueue = msg.properties.replyTo;
            const correlationId = msg.properties.correlationId;

            channel.sendToQueue(responseQueue, Buffer.from(JSON.stringify(courses)), {
              correlationId,
            });
          } catch (error) {
            console.error('Error al obtener los detalles de los cursos:', error);
          }

          channel.ack(msg);
        });
      });
    });
  }

  // Nuevo método para escuchar la cola de PurchaseService
  private listenForPurchaseRequests() {
    amqp.connect('amqp://localhost', (error0, connection) => {
      if (error0) {
        throw error0;
      }

      connection.createChannel((error1, channel) => {
        if (error1) {
          throw error1;
        }

        const queue = 'purchase_course_queue';

        channel.assertQueue(queue, { durable: false });

        channel.consume(queue, async (msg) => {
          if (!msg) return;

          const { courseIds } = JSON.parse(msg.content.toString());

          try {
            // Obtener los títulos y precios de los cursos para enviar de vuelta a PurchaseService
            const courses = await this.findByIds(courseIds);
            const courseDetails = courses.map(course => ({
              title: course.title,
              price: course.price,
            }));

            const responseQueue = msg.properties.replyTo;
            const correlationId = msg.properties.correlationId;

            channel.sendToQueue(responseQueue, Buffer.from(JSON.stringify(courseDetails)), {
              correlationId,
            });
          } catch (error) {
            console.error('Error al obtener los detalles de los cursos para la compra:', error);
          }

          channel.ack(msg);
        });
      });
    });
  }

  async findAll(): Promise<Course[]> {
    return this.courseRepository.find();
  }

  async create(courseData: Partial<Course>): Promise<Course> {
    const course = this.courseRepository.create(courseData);
    return this.courseRepository.save(course);
  }

  async findByIds(courseIds: number[]): Promise<Course[]> {
    return this.courseRepository.findByIds(courseIds);
  }
}
