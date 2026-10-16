import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { UserLanguage } from '../../entities/user-language.entity';
import { Language } from '../../entities/language.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AddLanguageDto } from './dto/add-language.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(UserLanguage)
    private userLanguageRepository: Repository<UserLanguage>,

    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  async findAll() {
    return this.usersRepository.find({
      select: ['id', 'firstName', 'lastName', 'email', 'city', 'role', 'profilePicture', 'bio'],
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['userLanguages', 'userLanguages.language'],
      select: ['id', 'firstName', 'lastName', 'email', 'bio', 'city', 'role', 'profilePicture', 'createdAt'],
    });
    if (!user) throw new NotFoundException(`Utilisateur #${id} non trouvé`);
    return user;
  }

  async updateProfile(id: number, updateProfileDto: UpdateProfileDto) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Utilisateur #${id} non trouvé`);

    Object.assign(user, updateProfileDto);
    const saved = await this.usersRepository.save(user);

    const { password, ...result } = saved as any;
    return result;
  }

  // ✅ Nouveau
  async deleteProfile(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`Utilisateur #${id} non trouvé`);
    await this.usersRepository.remove(user);
    return { message: 'Compte supprimé avec succès' };
  }

  async addLanguage(userId: number, addLanguageDto: AddLanguageDto) {
    const { languageId, level } = addLanguageDto;

    const language = await this.languageRepository.findOne({
      where: { id: languageId },
    });
    if (!language) throw new NotFoundException(`Langue #${languageId} non trouvée`);

    const existing = await this.userLanguageRepository.findOne({
      where: { userId, languageId },
    });
    if (existing) {
      existing.level = level;
      return this.userLanguageRepository.save(existing);
    }

    const userLanguage = this.userLanguageRepository.create({
      userId,
      languageId,
      level,
    });
    return this.userLanguageRepository.save(userLanguage);
  }

  async removeLanguage(userId: number, languageId: number) {
    const userLanguage = await this.userLanguageRepository.findOne({
      where: { userId, languageId },
    });
    if (!userLanguage) {
      throw new NotFoundException('Cette langue n\'est pas associée à cet utilisateur');
    }
    return this.userLanguageRepository.remove(userLanguage);
  }

  async getUserLanguages(userId: number) {
    return this.userLanguageRepository.find({
      where: { userId },
      relations: ['language'],
    });
  }

  async getUserEvents(userId: number) {
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['events'],
    });
    if (!user) throw new NotFoundException(`Utilisateur #${userId} non trouvé`);
    return user.events;
  }
}