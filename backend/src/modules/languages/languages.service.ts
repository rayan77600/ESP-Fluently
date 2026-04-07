import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '../../entities/language.entity';
import { CreateLanguageDto } from './dto/create-language.dto';

@Injectable()
export class LanguagesService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  async findAll() {
    return this.languageRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const language = await this.languageRepository.findOne({ where: { id } });
    if (!language) throw new NotFoundException(`Langue #${id} non trouvée`);
    return language;
  }

  async create(createLanguageDto: CreateLanguageDto) {
    const existing = await this.languageRepository.findOne({
      where: { code: createLanguageDto.code },
    });
    if (existing) throw new ConflictException(`La langue avec le code "${createLanguageDto.code}" existe déjà`);

    const language = this.languageRepository.create(createLanguageDto);
    return this.languageRepository.save(language);
  }

  async update(id: number, updateLanguageDto: CreateLanguageDto) {
    const language = await this.languageRepository.findOne({ where: { id } });
    if (!language) throw new NotFoundException(`Langue #${id} non trouvée`);

    Object.assign(language, updateLanguageDto);
    return this.languageRepository.save(language);
  }

  async remove(id: number) {
    const language = await this.languageRepository.findOne({ where: { id } });
    if (!language) throw new NotFoundException(`Langue #${id} non trouvée`);
    await this.languageRepository.remove(language);
    return { message: `Langue #${id} supprimée avec succès` };
  }
}