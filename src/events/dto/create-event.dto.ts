import { IsNotEmpty, MinLength, IsDateString } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateEventDto {
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  @MinLength(1)
  eventName: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) => value.trim())
  @MinLength(1)
  eventLocation: string;
}
