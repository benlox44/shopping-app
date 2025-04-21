import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column('text')
  description: string;

  @Column()
  imageUrl: string;  // Campo para la URL de la imagen
}
