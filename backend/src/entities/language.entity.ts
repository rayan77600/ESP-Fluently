import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('languages')
export class Language {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;   // ex: "Français", "English"

  @Column({ unique: true, length: 5 })
  code: string;   // ex: "fr", "en", "es"

  // Relations (commentées pour l'instant)
  // userLanguages: UserLanguage[];
  // eventLanguages: EventLanguage[];
}