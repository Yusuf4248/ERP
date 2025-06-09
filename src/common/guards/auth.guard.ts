import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader?.startsWith("Bearer ")) {
      throw new UnauthorizedException("Token not found");
    }
    const token = authHeader.split(" ")[1];

    const decoded = this.jwtService.decode(token);
    const role = decoded.role;

    if (!role) {
      throw new UnauthorizedException("Role not found");
    }

    const secret = this.getSecretByRole(role);

    try {
      const payload = await this.jwtService.verifyAsync(token, { secret });
      (req as any).user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException("The token is invalid");
    }
  }

  private getSecretByRole(role: string): string {
    switch (role) {
      case "admin":
        return process.env.ADMIN_ACCESS_TOKEN_KEY!;
      case "lid":
        return process.env.LID_ACCESS_TOKEN_KEY!;
      case "teacher":
        return process.env.TEACHER_ACCESS_TOKEN_KEY!;
      case "student":
        return process.env.STUDENT_ACCESS_TOKEN_KEY!;
      default:
        throw new UnauthorizedException("Role yaroqsiz");
    }
  }
}
