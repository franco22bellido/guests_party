// import { Transform } from 'class-transformer';

// import { IsEmail, IsNotEmpty, MinLength} from 'class-validator';

export class CreateUserDto {

    // @IsNotEmpty()
    // @IsEmail()
    email: string; 

    // @IsNotEmpty()
    // @MinLength(6)
    // @Transform(({ value }: TransformFnParams) => value?.trim())
    password: string;

    // @IsNotEmpty()
    username: string
}