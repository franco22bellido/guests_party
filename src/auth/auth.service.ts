import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt/dist';
@Injectable()
export class AuthService {

    constructor(
        private readonly _userService: UsersService,
        private readonly _jwtService: JwtService
    ){}

    async register(registerDto: RegisterDto){
        const user = await this._userService.findOneByEmail(registerDto.email);

        if(user){
            throw new HttpException('email is already exist' , HttpStatus.CONFLICT);
        }
        
        registerDto.password = await bcryptjs.hash(registerDto.password, 10);
        await this._userService.create(registerDto);
        return "contratulations"
    }

    async login(loginDto: LoginDto){
        const user = await this._userService.findOneByEmail(loginDto.email);

        if(!user){
            throw new HttpException('email not found' , HttpStatus.UNAUTHORIZED);
        }
        const isPasswordValid = await bcryptjs.compare(loginDto.password, user.password);
        if(!isPasswordValid){
            throw new HttpException('password is wrong' , HttpStatus.UNAUTHORIZED);
        }
        const payload = {email : user.email}
        const token = await this._jwtService.signAsync(payload);

        return {
            token, email : user.email
        }
    }

}
