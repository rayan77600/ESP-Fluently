import { User } from './user.entity';
import { Participation } from './participation.entity';
import { EventLanguage } from './event-language.entity';
import { Photo } from './photo.entity';
import { Message } from './message.entity';
import { Feedback } from './feedback.entity';
export declare class Event {
    id: number;
    title: string;
    description: string;
    city: string;
    address: string;
    eventDate: Date;
    maxParticipants: number;
    hostId: number;
    createdAt: Date;
    updatedAt: Date;
    host: User;
    participations: Participation[];
    eventLanguages: EventLanguage[];
    photos: Photo[];
    messages: Message[];
    feedbacks: Feedback[];
}
