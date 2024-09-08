import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/createUser.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/user.schema';
import { LoginUserDto } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async createUser(authPayload: CreateUserDTO): Promise<Partial<User>> {
    const { username, email, password } = authPayload;
    const findUser = await this.usersService.findOne(username);

    if (findUser) throw new HttpException('User already exists', 409);

    const hash = await bcrypt.hash(password, 10);
    const user: Partial<User> = {
      username,
      password: hash,
      email,
    };
    return await this.usersService.create(user);
  }

  async validateUser(authPayload: LoginUserDto): Promise<string> {
    const { username, password } = authPayload;
    const findUser = await this.usersService.findOne(username);

    if (findUser) {
      const { password, ...result } = findUser;
      return this.jwtService.sign(result);
    }
  }
}
