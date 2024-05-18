import { IsNotEmpty, IsNumber, MinLength} from 'class-validator'
import { Transform, TransformFnParams } from 'class-transformer'

export class CreateGuestDto{
    
    @IsNotEmpty()
    @Transform(({value}: TransformFnParams)=> value?.trim())
    @MinLength(3)
    firstName : string;

    @IsNotEmpty()
    @Transform(({value}: TransformFnParams)=> value?.trim())
    @MinLength(3)
    lastName: string;

    @IsNotEmpty()
    @IsNumber()
    eventId: number;
}