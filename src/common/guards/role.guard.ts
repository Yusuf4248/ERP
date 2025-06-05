import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../../app.constants";
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles) {
      return true;
    }

    const user = req.user;
    if (user?.is_creator === true) {
      return true;
    }
    const roles = user.role;
    if (!roles) {
      throw new ForbiddenException("User role not found");
    }
    const hasAccess = requiredRoles.includes(roles);

    if (!hasAccess) {
      throw new ForbiddenException("Bu amalga ruxsat yo'q");
    }
    return true;
  }
}
