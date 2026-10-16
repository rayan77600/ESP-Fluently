import { Event } from './event.entity';
import type { Language } from './language.entity';
export declare class EventLanguage {
    id: number;
    eventId: number;
    languageId: number;
    event: Event;
    language: Language;
}
