"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = seedAdmin;
const user_entity_1 = require("../../entities/user.entity");
const language_entity_1 = require("../../entities/language.entity");
const bcrypt = __importStar(require("bcryptjs"));
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
async function seedAdmin(dataSource) {
    const userRepository = dataSource.getRepository(user_entity_1.User);
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
            role: user_entity_1.UserRole.ADMIN,
        });
        await userRepository.save(admin);
        console.log('🌱 Compte admin créé : fluently@team.com');
    }
    else {
        console.log('✅ Admin déjà existant, seed ignoré');
    }
    const languageRepository = dataSource.getRepository(language_entity_1.Language);
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
    }
    else {
        console.log('✅ Langues déjà présentes, seed ignoré');
    }
}
//# sourceMappingURL=admin.seed.js.map