import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { LoginDto } from "../dto/login.dto";
import { AdminAuthService } from "./admin.auth.service";

@Controller("admin_auth")
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post("logIn")
  async signIn(
    @Body() logInDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.adminAuthService.logIn(logInDto, res);
  }

  @Get("logOut")
  signout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.adminAuthService.logOut(request, response);
  }

  @Get("refreshTokens")
  refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.adminAuthService.refreshTokens(request, response);
  }
}
