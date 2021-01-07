import { Test, TestingModule } from '@nestjs/testing';
import { SignUpMemberDto } from './dto/signup-member.dto';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp()', () => {
    it('새로운 멤버가 회원가입 된다', async () => {
      const dto = new SignUpMemberDto('will.seungho@gmail.com', '강승호');
      await service.signUp(dto);

      const findMembers = await service.findAll();
      expect(findMembers.length).toEqual(1);
    });
  });
});
