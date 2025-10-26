import { JwtPayload } from 'src/authGuard/authGruard.interface';

declare module 'express-serve-static-core' {
  export interface Request {
    user?: JwtPayload;
  }
}
