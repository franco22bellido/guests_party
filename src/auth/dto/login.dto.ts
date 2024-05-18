import {Transform, TransformFnParams} from 'class-transformer'
import {IsEmail, IsNotEmpty, MinLength} from 'class-validator'

export class LoginDto{

    @IsNotEmpty()
    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

}