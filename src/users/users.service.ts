import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignUpMemberDto } from './dto/signup-member.dto';
import { User } from './entities/user.entity';
import { UserServiceUtils } from './user.service.utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async signUp(signUpDto: SignUpMemberDto): Promise<void> {
    await UserServiceUtils.validateNonExistUser(
      this.userRepository,
      signUpDto.email,
    );
    this.userRepository.save(signUpDto.toEntity());
  }
}
