import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Event } from './event.entity';
import { Language } from './language.entity';

@Entity('event_languages')
export class EventLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, { onDelete: 'CASCADE' })
  event: Event;

  @Column()
  eventId: number;

  @ManyToOne(() => Language, { onDelete: 'CASCADE' })
  language: Language;

  @Column()
  languageId: number;
}