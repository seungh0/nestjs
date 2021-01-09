import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class SignUpMemberDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly name: string;

  constructor(email: string, name: string) {
    this.email = email;
    this.name = name;
  }

  toEntity(): User {
    return new User(this.email, this.name);
  }

  getEmail(): string {
    return this.email;
  }
}
