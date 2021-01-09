import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
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
  @UseInterceptors(LoggingInterceptor)
  @HttpCode(201)
  async signUp(@Body() signUpMemberDto: SignUpMemberDto): Promise<string> {
    await this.usersService.signUp(signUpMemberDto);
    return 'OK';
  }
}
