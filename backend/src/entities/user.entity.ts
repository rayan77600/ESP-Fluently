import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Event } from './event.entity';
import { Participation } from './participation.entity';
import { UserLanguage } from './user-language.entity';
import { Message } from './message.entity';
import { Photo } from './photo.entity';
import { Feedback } from './feedback.entity';
import { Notification } from './notification.entity';

export enum UserRole {
  USER = 'user',
  HOST = 'host',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty()
  email: string;

  @Column()
  @Exclude() // ne jamais retourner le mot de passe dans les réponses API
  password: string;

  @Column({ name: 'first_name' })
  @ApiProperty()
  firstName: string;

  @Column({ name: 'last_name' })
  @ApiProperty()
  lastName: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  bio: string;

  @Column({ nullable: true })
  @ApiProperty({ required: false })
  city: string;

  @Column({ name: 'birth_date', type: 'date', nullable: true })
  @ApiProperty({ required: false })
  birthDate: Date;

  @Column({ name: 'profile_picture', nullable: true })
  @ApiProperty({ required: false })
  profilePicture: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  @ApiProperty({ enum: UserRole })
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Relations
  @OneToMany(() => Event, (event) => event.host)
  events: Event[];

  @OneToMany(() => Participation, (participation) => participation.user)
  participations: Participation[];

  @OneToMany(() => UserLanguage, (ul) => ul.user)
  userLanguages: UserLanguage[];

  @OneToMany(() => Message, (message) => message.author)
  messages: Message[];

  @OneToMany(() => Photo, (photo) => photo.uploadedBy)
  photos: Photo[];

  @OneToMany(() => Feedback, (feedback) => feedback.author)
  feedbacks: Feedback[];

  @OneToMany(() => Notification, (notification) => notification.recipient)
  notifications: Notification[];
}