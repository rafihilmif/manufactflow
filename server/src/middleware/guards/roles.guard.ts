import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES } from '../../decorator/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.getAllAndOverride<string[]>(ROLES, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requireRoles) {
      return true;
    }

    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new UnauthorizedException('No token provided');
    }

    if (!user.role) {
      throw new ForbiddenException('User role not found');
    }

    const hasRole = requireRoles.some((role) => role === user.role);

    if (!hasRole) {
      throw new ForbiddenException(`Access denied, required roles: ${requireRoles}`);
    }

    return true;
  }
}
