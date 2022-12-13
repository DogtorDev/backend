import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadTokenEntity } from '../entities/token.entity';
import { RoleEntity } from '../entities/roles.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles: RoleEntity[] = this.reflector.get<RoleEntity[]>(
      ROLES_KEY,
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest();
    const user: PayloadTokenEntity = request.user;
    const isAuth = roles.some((role) => user.role === role);

    if (!isAuth) {
      throw new UnauthorizedException('You are not authorized');
    }

    return isAuth;
  }
}
