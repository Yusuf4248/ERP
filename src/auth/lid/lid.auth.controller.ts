import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { LidAuthService } from "./lid.auth.service";
import { LoginDto } from "../dto/login.dto";
import { Request, Response } from "express";
import { CreateLidDto } from "../../lid/dto/create-lid.dto";

@Controller("lid-auth")
export class LidAuthController {
  constructor(private readonly lidAuthService: LidAuthService) {}

  @Post("register")
  async logUp(@Body() createLidDto: CreateLidDto) {
    return this.lidAuthService.register(createLidDto);
  }

  @Post("log-in")
  async logIn(
    @Body() logInDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.lidAuthService.logIn(logInDto, res);
  }

  @Get("log-out")
  logOut(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.lidAuthService.logOut(request, response);
  }

  @Get("refresh-tokens")
  refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.lidAuthService.refreshTokens(request, response);
  }
}
