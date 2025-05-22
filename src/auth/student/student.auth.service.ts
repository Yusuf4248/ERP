import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { StudentService } from "../../student/student.service";
import { JwtService } from "@nestjs/jwt";
import { Student } from "../../student/entities/student.entities";
import { LoginDto } from "../dto/login.dto";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";

@Injectable()
export class StudentAuthService {
  constructor(
    private readonly studentService: StudentService,
    private readonly jwtService: JwtService
  ) {}
  async generateTokens(student: Student) {
    const payload = {
      id: student.id,
      email: student.email,
      role: "STUDENT",
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.STUDENT_ACCESS_TOKEN_KEY,
        expiresIn: process.env.STUDENT_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.STUDENT_REFRESH_TOKEN_KEY,
        expiresIn: process.env.STUDENT_REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async logIn(loginDto: LoginDto, res: Response) {
    const student = await this.studentService.findByEmail(loginDto.email);
    if (!student) {
      throw new BadRequestException("Email or pasword is incorrect");
    }

    const validPassword = await bcrypt.compare(
      loginDto.password,
      student.password_hash
    );
    if (!validPassword) {
      throw new BadRequestException("Email or password is incorrect");
    }
    const { accessToken, refreshToken } = await this.generateTokens(student);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_REFRESH_TIME),
      httpOnly: true,
    });
    const refreshTokenHash = await bcrypt.hash(refreshToken, 7);
    await this.studentService.updateTokenHash(student.id, refreshTokenHash);

    return { message: "Successfully logged in", access_token: accessToken };
  }

  async logOut(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new UnauthorizedException("Refresh token not found. Please log in");
    }

    const decoded_token = await this.jwtService.verify(refresh_token, {
      secret: process.env.STUDENT_REFRESH_TOKEN_KEY,
    });

    const student = await this.studentService.findOne(+decoded_token.id);
    if (!student) {
      throw new BadRequestException("Something went wrong");
    }
    await this.studentService.updateTokenHash(student.student.id, "");

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
      secret: process.env.STUDENT_REFRESH_TOKEN_KEY,
    });
    const student = await this.studentService.findByEmail(decoded_token.email);
    if (!student) {
      throw new BadRequestException("Something went wrong");
    }

    const { accessToken, refreshToken } = await this.generateTokens(student);

    const refreshTokenHash = await bcrypt.hash(refreshToken, 7);
    await this.studentService.updateTokenHash(student.id, refreshTokenHash);

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
