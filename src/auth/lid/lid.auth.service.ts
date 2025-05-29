import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { LidService } from "../../lid/lid.service";
import { JwtService } from "@nestjs/jwt";
import { Lid } from "../../lid/entities/lid.entity";
import { LoginDto } from "../dto/login.dto";
import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { CreateLidDto } from "../../lid/dto/create-lid.dto";

@Injectable()
export class LidAuthService {
  constructor(
    private readonly lidService: LidService,
    private readonly jwtService: JwtService
  ) {}
  async generateTokens(lid: Lid) {
    const payload = {
      id: lid.id,
      email: lid.email,
      role: "LID",
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.LID_ACCESS_TOKEN_KEY,
        expiresIn: process.env.LID_ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.LID_REFRESH_TOKEN_KEY,
        expiresIn: process.env.LID_REFRESH_TOKEN_TIME,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async logUp(createLidDto: CreateLidDto) {
    const candidate = await this.lidService.findByEmail(createLidDto.email);
    if (candidate) {
      throw new BadRequestException("Lid with this email already exists");
    }
    const lid = await this.lidService.create(createLidDto);
    return {
      lid,
    };
  }

  async logIn(loginDto: LoginDto, res: Response) {
    const lid = await this.lidService.findByEmail(loginDto.email);
    if (!lid) {
      throw new BadRequestException("Email or pasword is incorrect");
    }

    const validPassword = await bcrypt.compare(
      loginDto.password,
      lid.password_hash
    );
    if (!validPassword) {
      throw new BadRequestException("Email or password is incorrect");
    }
    const { accessToken, refreshToken } = await this.generateTokens(lid);

    res.cookie("refresh_token", refreshToken, {
      maxAge: Number(process.env.COOKIE_REFRESH_TIME),
      httpOnly: true,
    });
    const refreshTokenHash = await bcrypt.hash(refreshToken, 7);
    await this.lidService.updateTokenHash(lid.id, refreshTokenHash);

    return { message: "Successfully logged in", access_token: accessToken };
  }

  async logOut(req: Request, res: Response) {
    const refresh_token = req.cookies.refresh_token;
    if (!refresh_token) {
      throw new UnauthorizedException("Refresh token not found. Please log in");
    }

    const decoded_token = await this.jwtService.verify(refresh_token, {
      secret: process.env.LID_REFRESH_TOKEN_KEY,
    });

    const lid = await this.lidService.findOne(+decoded_token.id);
    if (!lid) {
      throw new BadRequestException("Something went wrong");
    }
    await this.lidService.updateTokenHash(lid.lid.id, "");

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
      secret: process.env.LID_REFRESH_TOKEN_KEY,
    });
    const lid = await this.lidService.findByEmail(decoded_token.email);
    if (!lid) {
      throw new BadRequestException("Something went wrong");
    }

    const { accessToken, refreshToken } = await this.generateTokens(lid);

    const refreshTokenHash = await bcrypt.hash(refreshToken, 7);
    await this.lidService.updateTokenHash(lid.id, refreshTokenHash);

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
