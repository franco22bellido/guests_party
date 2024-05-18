import {IsNotEmpty, MinLength} from 'class-validator'
import {Transform, TransformFnParams} from 'class-transformer'


export class CreateEventDto {

    @IsNotEmpty()
    @Transform(({value}: TransformFnParams)=> value.trim())
    @MinLength(3)
    eventName: string;

    @IsNotEmpty()
    @Transform(({value}: TransformFnParams)=> value.trim())
    @MinLength(3)
    startDate: string;

}