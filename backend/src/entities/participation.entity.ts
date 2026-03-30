import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Event } from './event.entity';

export enum ParticipationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REFUSED = 'refused',
}

@Entity('participations')
export class Participation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Event, { onDelete: 'CASCADE' })
  event: Event;

  @Column()
  eventId: number;

  @Column({ type: 'enum', enum: ParticipationStatus, default: ParticipationStatus.PENDING })
  status: ParticipationStatus;

  @CreateDateColumn()
  joinedAt: Date;
}