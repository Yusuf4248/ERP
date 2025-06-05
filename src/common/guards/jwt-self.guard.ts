import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

@Injectable()
export class JwtSelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const user = req.user;

    if (user.role == "admin" || user.role == "superadmin") {
      return true;
    }
    if (+user.id == +req.params.id) {
      throw new ForbiddenException("Ruxsat etilmagan foydalanuvchi!");
    }
    return true;
  }
}
