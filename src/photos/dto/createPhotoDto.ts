import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreatePhotoDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsArray()
  categories: string[];

  @IsString()
  description?: string;
}
