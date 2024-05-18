import { Request } from 'express';
export interface RequestUser extends Request {
  user: {
    id: number;
    exp: number;
    iat: number;
  };
}
