import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  city: string;

  @Column()
  address: string;

  @Column()
  eventDate: Date;

  @Column()
  maxParticipants: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  host: User;

  @Column()
  hostId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations à ajouter plus tard
  // participations: Participation[];
  // eventLanguages: EventLanguage[];
  // photos: Photo[];
  // messages: Message[];
  // feedbacks: Feedback[];
}