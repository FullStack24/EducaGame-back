import {
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
  IsArray,
  IsDate,
  IsBooleanString,
  IsNotEmpty,
} from 'class-validator';
export class CreateQuizDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  turmaId!: number;

  @IsString()
  categoria!: string;
}

export class CreateAskDto {
  @IsString()
  texto!: string;

  @IsInt()
  quizId!: number;

  @IsNotEmpty()
  correta!: boolean | string;
}
