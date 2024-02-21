import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {JwtService} from '@nestjs/jwt'

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(private readonly _jwtService: JwtService){}

  async canActivate(context: ExecutionContext,): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    
    const token = request.headers.authorization;
    
    if(!token){
      throw new  HttpException('token no provided', HttpStatus.UNAUTHORIZED);
    }
    try {
       const payload =  await this._jwtService.verifyAsync(token,{ secret: "jwtSecret"});
       request.user = payload;

    } catch (error) {
      throw new  HttpException('error verifying token', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
