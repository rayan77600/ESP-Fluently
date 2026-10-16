import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { AddLanguageDto } from './dto/add-language.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../../entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Liste de tous les utilisateurs (admin uniquement)' })
  @ApiResponse({ status: 200, description: 'Liste des utilisateurs' })
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  @ApiOperation({ summary: 'Mon profil complet avec mes langues' })
  @ApiResponse({ status: 200, description: 'Profil de l\'utilisateur connecté' })
  getMyProfile(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }

  @Put('profile')
  @ApiOperation({ summary: 'Modifier mon profil' })
  @ApiResponse({ status: 200, description: 'Profil mis à jour' })
  updateMyProfile(@Request() req, @Body() updateProfileDto: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.id, updateProfileDto);
  }

  // ✅ Nouveau
  @Delete('profile')
  @ApiOperation({ summary: 'Supprimer mon compte' })
  @ApiResponse({ status: 200, description: 'Compte supprimé avec succès' })
  @ApiResponse({ status: 401, description: 'Token manquant ou invalide' })
  deleteMyProfile(@Request() req) {
    return this.usersService.deleteProfile(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Voir le profil d\'un utilisateur par ID' })
  @ApiResponse({ status: 200, description: 'Profil de l\'utilisateur' })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post('languages')
  @ApiOperation({ summary: 'Ajouter une langue à mon profil (ou mettre à jour le niveau)' })
  @ApiResponse({ status: 201, description: 'Langue ajoutée ou mise à jour' })
  addLanguage(@Request() req, @Body() addLanguageDto: AddLanguageDto) {
    return this.usersService.addLanguage(req.user.id, addLanguageDto);
  }

  @Delete('languages/:languageId')
  @ApiOperation({ summary: 'Retirer une langue de mon profil' })
  @ApiResponse({ status: 200, description: 'Langue retirée' })
  removeLanguage(
    @Request() req,
    @Param('languageId', ParseIntPipe) languageId: number,
  ) {
    return this.usersService.removeLanguage(req.user.id, languageId);
  }

  @Get('me/languages')
  @ApiOperation({ summary: 'Voir mes langues' })
  @ApiResponse({ status: 200, description: 'Liste des langues de l\'utilisateur' })
  getMyLanguages(@Request() req) {
    return this.usersService.getUserLanguages(req.user.id);
  }

  @Get('me/events')
  @ApiOperation({ summary: 'Voir les événements que j\'ai créés' })
  @ApiResponse({ status: 200, description: 'Liste des événements créés' })
  getMyEvents(@Request() req) {
    return this.usersService.getUserEvents(req.user.id);
  }
}