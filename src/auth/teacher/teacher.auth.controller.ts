import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { TeacherAuthService } from "./teacher.auth.service";
import { LoginDto } from "../dto/login.dto";

@Controller("teacher_auth")
export class TeacherAuthController {
  constructor(private readonly teacherAuthService: TeacherAuthService) {}

  @Post("logIn")
  async signIn(
    @Body() logInDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.teacherAuthService.logIn(logInDto, res);
  }

  @Get("logOut")
  signout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.teacherAuthService.logOut(request, response);
  }

  @Get("refreshTokens")
  refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.teacherAuthService.refreshTokens(request, response);
  }
}
