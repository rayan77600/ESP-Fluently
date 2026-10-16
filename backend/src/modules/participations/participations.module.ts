import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParticipationsController } from './participations.controller';
import { ParticipationsService } from './participations.service';
import { Participation } from '../../entities/participation.entity';
import { Event } from '../../entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participation, Event])],
  controllers: [ParticipationsController],
  providers: [ParticipationsService],
  exports: [ParticipationsService],
})
export class ParticipationsModule {}