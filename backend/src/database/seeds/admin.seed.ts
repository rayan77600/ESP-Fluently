import { DataSource } from 'typeorm';
import { User, UserRole } from '../../entities/user.entity';
import { Language } from '../../entities/language.entity';
import * as bcrypt from 'bcryptjs';

const DEFAULT_LANGUAGES = [
  { name: 'Français', code: 'fr' },
  { name: 'Anglais', code: 'en' },
  { name: 'Espagnol', code: 'es' },
  { name: 'Allemand', code: 'de' },
  { name: 'Italien', code: 'it' },
  { name: 'Portugais', code: 'pt' },
  { name: 'Arabe', code: 'ar' },
  { name: 'Mandarin', code: 'zh' },
  { name: 'Japonais', code: 'ja' },
  { name: 'Coréen', code: 'ko' },
];

export async function seedAdmin(dataSource: DataSource): Promise<void> {
  // ✅ Seed admin
  const userRepository = dataSource.getRepository(User);
  const existingAdmin = await userRepository.findOne({
    where: { email: 'fluently@team.com' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('ESPFluently@2026', 10);
    const admin = userRepository.create({
      email: 'fluently@team.com',
      password: hashedPassword,
      firstName: 'Fluently',
      lastName: 'Admin',
      role: UserRole.ADMIN,
    });
    await userRepository.save(admin);
    console.log('🌱 Compte admin créé : fluently@team.com');
  } else {
    console.log('✅ Admin déjà existant, seed ignoré');
  }

  // ✅ Seed langues
  const languageRepository = dataSource.getRepository(Language);
  let languesCreees = 0;
  for (const lang of DEFAULT_LANGUAGES) {
    const exists = await languageRepository.findOne({ where: { code: lang.code } });
    if (!exists) {
      await languageRepository.save(languageRepository.create(lang));
      languesCreees++;
    }
  }

  if (languesCreees > 0) {
    console.log(`🌍 ${languesCreees} langue(s) créée(s)`);
  } else {
    console.log('✅ Langues déjà présentes, seed ignoré');
  }
}