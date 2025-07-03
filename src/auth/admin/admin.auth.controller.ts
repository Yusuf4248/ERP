import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { LoginDto } from "../dto/login.dto";
import { AdminAuthService } from "./admin.auth.service";

@Controller("admin-auth")
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post("log-in")
  async signIn(
    @Body() logInDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminAuthService.logIn(logInDto, res);
  }

  @Get("log-out")
  signout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.adminAuthService.logOut(request, response);
  }

  @Get("refresh-tokens")
  refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.adminAuthService.refreshTokens(request, response);
  }
}
