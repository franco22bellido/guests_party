import { Body, Controller, Post } from '@nestjs/common';
import { Get, Request, UseGuards } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './guards/auth.guard';
import { LoginDto } from './dto/login.dto';
import { RequestUser } from './dto/request.user';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly _authService: AuthService
    ){}
    
    @Post('/register')
    register(
        @Body()
        registerDto: RegisterDto
    ){
        return this._authService.register(registerDto);
    }

    
    @Post('/login')
    login(
        @Body() loginDto: LoginDto
    ){
        return this._authService.login(loginDto);
    }

    @Get('/profile')
    @UseGuards(AuthGuard)
    profile(
        @Request() req: RequestUser
    ){
        return req.user;
    }
    
}