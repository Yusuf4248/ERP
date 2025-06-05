import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";

@Injectable()
export class SuperAdminGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers["authorization"];

    if (!authHeader) throw new UnauthorizedException("Token mavjud emas");

    const token = authHeader.split(" ")[1];

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get<string>("ADMIN_ACCESS_TOKEN_KEY"),
      });

      if (payload.role !== "admin" || payload.is_creator !== true) {
        throw new ForbiddenException("Faqat SuperAdmin uchun");
      }

      request["user"] = payload;
      return true;
    } catch (err) {
      throw new UnauthorizedException("Token yaroqsiz yoki muddati o'tgan");
    }
  }
}
