import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  USER = 'user',
  HOST = 'host',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  profilePicture: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations (on les ajoutera plus tard)
  // events: Event[];
  // participations: Participation[];
  // userLanguages: UserLanguage[];
  // sentMessages: Message[];
  // photos: Photo[];
  // feedbacks: Feedback[];
  // notifications: Notification[];
  // aiSessions: AIConversationSession[];
}