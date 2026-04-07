import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger';
import { ParticipationsService } from './participations.service';
import { UpdateParticipationDto } from './dto/update-participation.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Participations')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('participations')
export class ParticipationsController {
  constructor(private readonly participationsService: ParticipationsService) {}

  @Post('events/:eventId/join')
  @ApiOperation({ summary: 'Demander à participer à un événement' })
  @ApiResponse({ status: 201, description: 'Demande de participation envoyée' })
  @ApiResponse({ status: 409, description: 'Déjà inscrit à cet événement' })
  joinEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Request() req,
  ) {
    return this.participationsService.joinEvent(eventId, req.user.id);
  }

  @Delete('events/:eventId/leave')
  @ApiOperation({ summary: 'Annuler ma participation à un événement' })
  cancelParticipation(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Request() req,
  ) {
    return this.participationsService.cancelParticipation(eventId, req.user.id);
  }

  @Get('events/:eventId')
  @ApiOperation({ summary: 'Liste des participants d\'un événement (hôte)' })
  getEventParticipations(@Param('eventId', ParseIntPipe) eventId: number) {
    return this.participationsService.getEventParticipations(eventId);
  }

  @Get('me')
  @ApiOperation({ summary: 'Mes participations (tous mes événements rejoints)' })
  getMyParticipations(@Request() req) {
    return this.participationsService.getMyParticipations(req.user.id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Accepter ou refuser une participation (hôte)' })
  @ApiResponse({ status: 200, description: 'Statut mis à jour' })
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdateParticipationDto,
    @Request() req,
  ) {
    return this.participationsService.updateStatus(id, updateDto, req.user.id);
  }
}