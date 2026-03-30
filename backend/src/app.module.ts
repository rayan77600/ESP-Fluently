import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

// Import des entités
import { User } from './entities/user.entity';
import { Language } from './entities/language.entity';
import { Event } from './entities/event.entity';
import { Participation } from './entities/participation.entity';
import { UserLanguage } from './entities/user-language.entity';
import { EventLanguage } from './entities/event-language.entity';
import { Photo } from './entities/photo.entity';
import { Message } from './entities/message.entity';
import { Feedback } from './entities/feedback.entity';
import { Notification } from './entities/notification.entity';

// Import du module Auth
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [
        User,
        Language,
        Event,
        Participation,
        UserLanguage,
        EventLanguage,
        Photo,
        Message,
        Feedback,
        Notification,
      ],
      synchronize: true,     // true seulement en développement
      logging: true,
    }),

    AuthModule,   // ← Correctement placé ici
  ],
})
export class AppModule {}