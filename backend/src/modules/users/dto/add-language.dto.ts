import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEnum } from 'class-validator';
import { LanguageLevel } from '../../../entities/user-language.entity';

export class AddLanguageDto {
  @ApiProperty({ example: 1, description: 'ID de la langue' })
  @IsNumber()
  languageId: number;

  @ApiProperty({ enum: LanguageLevel, example: LanguageLevel.INTERMEDIATE })
  @IsEnum(LanguageLevel)
  level: LanguageLevel;
}