import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TeacherService } from "../../teacher/teacher.service";
import { Teacher } from "../../teacher/entities/teacher.entity";
import { LoginDto } from "../dto/login.dto";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

@Injectable()
export class TeacherAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly teacherService: TeacherService
  ) {}

  async generateTokens(teacher: Teacher) {
    const payload = {
      id: teacher.id,
      email: teacher.email,
      role: "teacher",
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.TEACHER_ACCESS_TOKEN_KEY,
        expiresIn: process.env.TEACHER_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.TEACHER_REFRESH_TOKEN_KEY,
        expiresIn: process.env.TEACHER_REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async logIn(loginDto: LoginDto, res: Response) {
    const teacher = await this.teacherService.findByEmail(loginDto.email);
    if (!teacher) {
      throw new BadRequestException("Email or pasword is incorrect");
    }

    const validPassword = await bcrypt.compare(
      loginDto.password,
      teacher.password
    );
    if (!validPassword) {
      throw new BadRequestException("Email or password is incorrect");
    }
    const { accessToken, refreshToken } = await this.generateTokens(teacher);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_REFRESH_TIME),
      httpOnly: true,
    });
    const refreshTokenHash = await bcrypt.hash(refreshToken, 7);
    await this.teacherService.updateTokenHash(teacher.id, refreshTokenHash);

    return { message: "Successfully logged in", access_token: accessToken };
  }

  async logOut(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new UnauthorizedException("Refresh token not found. Please log in");
    }

    const decoded_token = await this.jwtService.verify(refresh_token, {
      secret: process.env.TEACHER_REFRESH_TOKEN_KEY,
    });

    const teacher = await this.teacherService.findOne(+decoded_token.id);
    if (!teacher) {
      throw new BadRequestException("Something went wrong");
    }
    await this.teacherService.updateTokenHash(teacher.teacher.id, "");

    res.clearCookie("refresh_token");

    return {
      success: true,
      message: "Signed out successfully",
    };
  }

  async refreshTokens(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new UnauthorizedException("Refresh token not found. Please log in");
    }
    const decoded_token = await this.jwtService.verify(refresh_token, {
      secret: process.env.TEACHER_REFRESH_TOKEN_KEY,
    });
    const teacher = await this.teacherService.findByEmail(decoded_token.email);
    if (!teacher) {
      throw new BadRequestException("Something went wrong");
    }

    const { accessToken, refreshToken } = await this.generateTokens(teacher);

    const refreshTokenHash = await bcrypt.hash(refreshToken, 7);
    await this.teacherService.updateTokenHash(teacher.id, refreshTokenHash);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_REFRESH_TIME),
      httpOnly: true,
    });

    return {
      success: true,
      message: "Tokens updated!",
      access_token: accessToken,
    };
  }
}
