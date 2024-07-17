import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty({ example: 'admin', description: 'The username of the user' })
  username: string;

  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'The email of the user',
  })
  email: string;

  @ApiProperty({ example: 'admin', description: 'The password of the user' })
  password: string;
}
