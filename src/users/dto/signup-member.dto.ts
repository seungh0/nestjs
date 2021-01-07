import { IsEmail, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class SignUpMemberDto {
  @IsEmail()
  readonly email: string;

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
