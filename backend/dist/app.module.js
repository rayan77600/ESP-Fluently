"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const user_entity_1 = require("./entities/user.entity");
const language_entity_1 = require("./entities/language.entity");
const event_entity_1 = require("./entities/event.entity");
const participation_entity_1 = require("./entities/participation.entity");
const user_language_entity_1 = require("./entities/user-language.entity");
const event_language_entity_1 = require("./entities/event-language.entity");
const photo_entity_1 = require("./entities/photo.entity");
const message_entity_1 = require("./entities/message.entity");
const feedback_entity_1 = require("./entities/feedback.entity");
const notification_entity_1 = require("./entities/notification.entity");
const auth_module_1 = require("./modules/auth/auth.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                url: process.env.DATABASE_URL,
                entities: [
                    user_entity_1.User,
                    language_entity_1.Language,
                    event_entity_1.Event,
                    participation_entity_1.Participation,
                    user_language_entity_1.UserLanguage,
                    event_language_entity_1.EventLanguage,
                    photo_entity_1.Photo,
                    message_entity_1.Message,
                    feedback_entity_1.Feedback,
                    notification_entity_1.Notification,
                ],
                synchronize: true,
                logging: true,
            }),
            auth_module_1.AuthModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map