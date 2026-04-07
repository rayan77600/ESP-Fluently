import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsNumber,
  IsArray,
  Min,
  Max,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'Soirée Franco-Espagnole à Paris' })
  @IsString()
  title: string;

  @ApiProperty({ required: false, example: 'Venez pratiquer le français et l\'espagnol dans une ambiance conviviale !' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Paris' })
  @IsString()
  city: string;

  @ApiProperty({ required: false, example: '12 Rue de la Paix, 75001 Paris' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ example: '2026-06-15T19:00:00.000Z' })
  @IsDateString()
  eventDate: string;

  @ApiProperty({ example: 15, minimum: 2, maximum: 100 })
  @IsNumber()
  @Min(2)
  @Max(100)
  maxParticipants: number;

  @ApiProperty({ required: false, example: [1, 2], description: 'IDs des langues de l\'événement' })
  @IsOptional()
  @IsArray()
  languageIds?: number[];
}