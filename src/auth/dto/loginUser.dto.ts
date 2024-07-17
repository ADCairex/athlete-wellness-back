import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'admin', description: 'The username of the user' })
  username: string;

  @ApiProperty({ example: 'admin', description: 'The password of the user' })
  password: string;
}
