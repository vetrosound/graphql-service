import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from '../graphql.schema';
import { of } from 'rxjs';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let userService: UsersService;
  const userId = 1234;
  const mockUser: User = {
    id: userId,
    firstName: 'john',
    lastName: 'smith',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, UsersService],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getUser', () => {
    it('should return expected user', done => {
      spyOn(userService, 'findOneById').and.returnValue(of(mockUser));
      resolver.getUser(userId).subscribe(result => {
        expect(result).toStrictEqual(mockUser);
        done();
      });
    });
  });
});
