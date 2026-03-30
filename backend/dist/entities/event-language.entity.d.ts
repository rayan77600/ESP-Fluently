import { Event } from './event.entity';
import { Language } from './language.entity';
export declare class EventLanguage {
    id: number;
    event: Event;
    eventId: number;
    language: Language;
    languageId: number;
}
