import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { ParticipationStatus } from '../../../entities/participation.entity';

export class UpdateParticipationDto {
  @ApiProperty({ enum: ParticipationStatus, example: ParticipationStatus.ACCEPTED })
  @IsEnum(ParticipationStatus)
  status: ParticipationStatus;
}