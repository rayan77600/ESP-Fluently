import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Participation } from './participation.entity';
import { EventLanguage } from './event-language.entity';
import { Photo } from './photo.entity';
import { Message } from './message.entity';
import { Feedback } from './feedback.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  title: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ required: false })
  description: string;

  @Column()
  @ApiProperty()
  city: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  address: string;

  @Column({ name: 'event_date', type: 'timestamp' })
  @ApiProperty()
  eventDate: Date;

  @Column({ name: 'max_participants', default: 10 })
  @ApiProperty()
  maxParticipants: number;

  @Column({ name: 'host_id' })
  hostId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn({ name: 'host_id' })
  host: User;

  @OneToMany(() => Participation, (participation) => participation.event)
  participations: Participation[];

  @OneToMany(() => EventLanguage, (el) => el.event)
  eventLanguages: EventLanguage[];

  @OneToMany(() => Photo, (photo) => photo.event)
  photos: Photo[];

  @OneToMany(() => Message, (message) => message.event)
  messages: Message[];

  @OneToMany(() => Feedback, (feedback) => feedback.event)
  feedbacks: Feedback[];
}