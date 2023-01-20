import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppRequest } from 'src/common/dto/app-request.dto';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const [role] = this.reflector.get<string[]>('roles', context.getHandler());

    const request: AppRequest = context.switchToHttp().getRequest();
    if (request.user.role !== role) {
      throw new UnauthorizedException(
        `The ${request.user.role} is not an ${role}`,
      );
    }

    return true;
  }
}

