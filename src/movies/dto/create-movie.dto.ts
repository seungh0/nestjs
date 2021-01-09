import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  readonly title: string;

  @ApiProperty()
  @IsNumber()
  readonly year: number;

  @ApiProperty()
  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
