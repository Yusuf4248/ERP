import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { LidAuthService } from "./lid.auth.service";
import { LoginDto } from "../dto/login.dto";
import { Request, Response } from "express";
import { CreateLidDto } from "../../lid/dto/create-lid.dto";

@Controller("lid_auth")
export class LidAuthController {
  constructor(private readonly lidAuthService: LidAuthService) {}

  @Post("logUp")
  async logUp(@Body() createLidDto: CreateLidDto) {
    return this.lidAuthService.logUp(createLidDto);
  }

  @Post("logIn")
  async logIn(
    @Body() logInDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.lidAuthService.logIn(logInDto, res);
  }

  @Get("logOut")
  logOut(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.lidAuthService.logOut(request, response);
  }

  @Get("refreshTokens")
  refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.lidAuthService.refreshTokens(request, response);
  }
}
