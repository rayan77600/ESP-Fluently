import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Event } from './event.entity';

@Entity('feedbacks')
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  rating: number;        // 1 à 5

  @Column({ type: 'text', nullable: true })
  comment: string;

  @ManyToOne(() => Event, { onDelete: 'CASCADE' })
  event: Event;

  @Column()
  eventId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;
}