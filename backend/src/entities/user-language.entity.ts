import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Language } from './language.entity';

export enum LanguageLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  NATIVE = 'native',
}

@Entity('user_languages')
export class UserLanguage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Language, { onDelete: 'CASCADE' })
  language: Language;

  @Column()
  languageId: number;

  @Column({ type: 'enum', enum: LanguageLevel })
  level: LanguageLevel;
}