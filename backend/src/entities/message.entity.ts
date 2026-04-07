import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Event } from './event.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ name: 'event_id' })
  eventId: number;

  @Column({ name: 'author_id' })
  authorId: number;

  @CreateDateColumn({ name: 'sent_at' })
  sentAt: Date;

  // Relations
  @ManyToOne(() => Event, (event) => event.messages)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'author_id' })
  author: User;
}