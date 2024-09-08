import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
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
  async login(@Res() res: Response, @Body() authPayload: LoginUserDto) {
    const token = await this.authService.validateUser(authPayload);
    if (!token) {
      res.status(401).send('Invalid credentials');
    }
    res.setHeader('Authorization', token).status(200).send({ token });
  }

  @Get('status')
  status(@Req() req: Request) {
    return req.user;
  }
}
