import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
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

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'language_id' })
  languageId: number;

  @Column({
    type: 'enum',
    enum: LanguageLevel,
    default: LanguageLevel.BEGINNER,
  })
  @ApiProperty({ enum: LanguageLevel })
  level: LanguageLevel;

  // Relations
  @ManyToOne(() => User, (user) => user.userLanguages)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Language, (language) => language.userLanguages)
  @JoinColumn({ name: 'language_id' })
  language: Language;
}