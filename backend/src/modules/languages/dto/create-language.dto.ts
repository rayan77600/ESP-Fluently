import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class CreateLanguageDto {
  @ApiProperty({ example: 'Français' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'fr', description: 'Code ISO (2-5 caractères)' })
  @IsString()
  @Length(2, 5)
  code: string;
}