import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { User } from './entities/user.entity';
import { Event } from './entities/event.entity';
import { Participation } from './entities/participation.entity';
import { Language } from './entities/language.entity';
import { UserLanguage } from './entities/user-language.entity';
import { EventLanguage } from './entities/event-language.entity';
import { Photo } from './entities/photo.entity';
import { Message } from './entities/message.entity';
import { Feedback } from './entities/feedback.entity';
import { Notification } from './entities/notification.entity';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { EventsModule } from './modules/events/events.module';
import { ParticipationsModule } from './modules/participations/participations.module';
import { LanguagesModule } from './modules/languages/languages.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',

      // 🔥 IMPORTANT : compatible Docker
      host: process.env.DB_HOST || 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME || 'fluently',
      password: process.env.DB_PASSWORD || 'fluently123',
      database: process.env.DB_NAME || 'fluently',

      // Entities
      entities: [
        User,
        Event,
        Participation,
        Language,
        UserLanguage,
        EventLanguage,
        Photo,
        Message,
        Feedback,
        Notification,
      ],

      synchronize: true, // ⚠️ DEV ONLY
      logging: false,
    }),

    AuthModule,
    UsersModule,
    EventsModule,
    ParticipationsModule,
    LanguagesModule,
  ],
})
export class AppModule {}