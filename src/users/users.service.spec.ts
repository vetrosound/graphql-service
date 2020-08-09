import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../graphql.schema';
import { toArray } from 'rxjs/operators';

describe('UsersService', () => {
  let service: UsersService;
  const userId = 1234;
  const mockUser: User = {
    id: userId,
    firstName: 'john',
    lastName: 'smith',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOneById', () => {
    it('should return expected user', done => {
      service.findOneById(userId).subscribe(result => {
        expect(result).toStrictEqual(mockUser);
        done();
      });
    });
  });

  describe('findAllByIds', () => {
    it('should return expected list of users', done => {
      service
        .findAllByIds([userId])
        .pipe(toArray())
        .subscribe(result => {
          expect(result).toStrictEqual([mockUser]);
          done();
        });
    });
  });
});
