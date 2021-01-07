import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpMemberDto } from './dto/signup-member.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async signUp(@Body() signUpMemberDto: SignUpMemberDto): Promise<string> {
    await this.usersService.signUp(signUpMemberDto);
    return 'OK';
  }
}
