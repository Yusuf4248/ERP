import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { LoginDto } from "../dto/login.dto";
import { StudentAuthService } from "./student.auth.service";

@Controller("student_auth")
export class StudentAuthController {
  constructor(private readonly studentAuthService: StudentAuthService) {}

  @Post("logIn")
  async signIn(
    @Body() logInDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.studentAuthService.logIn(logInDto, res);
  }

  @Get("logOut")
  signout(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.studentAuthService.logOut(request, response);
  }

  @Get("refreshTokens")
  refreshTokens(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response
  ) {
    return this.studentAuthService.refreshTokens(request, response);
  }
}
