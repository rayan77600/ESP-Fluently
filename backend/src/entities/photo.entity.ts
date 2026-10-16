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

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column({ name: 'event_id' })
  eventId: number;

  @Column({ name: 'uploaded_by_id' })
  uploadedById: number;

  @CreateDateColumn({ name: 'uploaded_at' })
  uploadedAt: Date;

  // Relations
  @ManyToOne(() => Event, (event) => event.photos)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @ManyToOne(() => User, (user) => user.photos)
  @JoinColumn({ name: 'uploaded_by_id' })
  uploadedBy: User;
}