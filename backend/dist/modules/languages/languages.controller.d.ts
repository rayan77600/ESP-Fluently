import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
export declare class LanguagesController {
    private readonly languagesService;
    constructor(languagesService: LanguagesService);
    findAll(): Promise<import("../../entities/language.entity").Language[]>;
    findOne(id: number): Promise<import("../../entities/language.entity").Language>;
    create(createLanguageDto: CreateLanguageDto): Promise<import("../../entities/language.entity").Language>;
    update(id: number, updateLanguageDto: CreateLanguageDto): Promise<import("../../entities/language.entity").Language>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
