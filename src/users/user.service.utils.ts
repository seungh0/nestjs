import { ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

export class UserServiceUtils {
  static async validateNonExistUser(
    userRepository: Repository<User>,
    email: string,
  ) {
    const findUser = await userRepository.findOne({ email: email });
    if (findUser) {
      throw new ConflictException(`이미 존재하는 멤버 (${email}) 입니다`);
    }
  }
}
