import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  type Relation,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('languages')
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @ApiProperty({ example: 'Français' })
  name: string;

  @Column({ unique: true, length: 5 })
  @ApiProperty({ example: 'fr' })
  code: string;

  // Relations — on utilise () => import(...) pour éviter la circularité
  @OneToMany('UserLanguage', 'language')
  userLanguages: Relation<any[]>;

  @OneToMany('EventLanguage', 'language')
  eventLanguages: Relation<any[]>;
}