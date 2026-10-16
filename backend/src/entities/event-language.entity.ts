import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Event } from './event.entity';
import type { Language } from './language.entity';

@Entity('event_languages')
export class EventLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventId: number;

  @Column()
  languageId: number;

  @ManyToOne(() => Event, (event) => event.eventLanguages, { onDelete: 'CASCADE' })
  event: Event;

  @ManyToOne('Language', 'eventLanguages', { onDelete: 'CASCADE' })
  language: Language;
}