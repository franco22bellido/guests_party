import {IsNotEmpty, IsEmail, MinLength} from 'class-validator'
import {Transform, TransformFnParams} from 'class-transformer'



export class RegisterDto {

    @IsNotEmpty()
    @Transform(({value}: TransformFnParams)=> value?.trim())
    username : string;

    @IsNotEmpty()
    @Transform(({value}: TransformFnParams)=> value?.trim())
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @MinLength(6, {message : 'password is less than 6 characters'})
    password: string;

}