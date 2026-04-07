import { Repository } from 'typeorm';
import { Language } from '../../entities/language.entity';
import { CreateLanguageDto } from './dto/create-language.dto';
export declare class LanguagesService {
    private languageRepository;
    constructor(languageRepository: Repository<Language>);
    findAll(): Promise<Language[]>;
    findOne(id: number): Promise<Language>;
    create(createLanguageDto: CreateLanguageDto): Promise<Language>;
    update(id: number, updateLanguageDto: CreateLanguageDto): Promise<Language>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
