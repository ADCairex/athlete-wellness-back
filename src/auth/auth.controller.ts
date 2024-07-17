import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('register')
  async register(@Body() authPayload: CreateUserDTO) {
    const user = this.authService.createUser(authPayload);
    return user;
  }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: Request, @Body() authPayload: LoginUserDto) {
    return req.user;
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    return req.user;
  }
}
