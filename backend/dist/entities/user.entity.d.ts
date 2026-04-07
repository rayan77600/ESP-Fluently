import { Event } from './event.entity';
import { Participation } from './participation.entity';
import { UserLanguage } from './user-language.entity';
import { Message } from './message.entity';
import { Photo } from './photo.entity';
import { Feedback } from './feedback.entity';
import { Notification } from './notification.entity';
export declare enum UserRole {
    USER = "user",
    HOST = "host",
    ADMIN = "admin"
}
export declare class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    bio: string;
    city: string;
    birthDate: Date;
    profilePicture: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
    events: Event[];
    participations: Participation[];
    userLanguages: UserLanguage[];
    messages: Message[];
    photos: Photo[];
    feedbacks: Feedback[];
    notifications: Notification[];
}
