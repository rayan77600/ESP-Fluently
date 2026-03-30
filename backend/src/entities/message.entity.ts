import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Event } from './event.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @ManyToOne(() => Event, { onDelete: 'CASCADE' })
  event: Event;

  @Column()
  eventId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  sender: User;

  @Column()
  senderId: number;

  @CreateDateColumn()
  sentAt: Date;
}