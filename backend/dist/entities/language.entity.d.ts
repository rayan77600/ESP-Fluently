import { type Relation } from 'typeorm';
export declare class Language {
    id: number;
    name: string;
    code: string;
    userLanguages: Relation<any[]>;
    eventLanguages: Relation<any[]>;
}
