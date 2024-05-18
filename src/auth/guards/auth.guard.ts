import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RequestUser } from '../dto/request.user';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: RequestUser = context.switchToHttp().getRequest();
    const token = request.cookies.token;

    if (!token) {
      throw new HttpException('token no provided', HttpStatus.UNAUTHORIZED);
    }
    try {
      const payload = await this._jwtService.verifyAsync(token, {
        secret: this._configService.get<string>('JWT_SECRET') || 'jwtSecret',
      });
      request['user'] = payload;
    } catch (error) {
      throw new HttpException('error verifying token', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
