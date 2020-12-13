import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../graphql.schema';
import { of } from 'rxjs';

describe('UsersService', () => {
  let service: UsersService;
  const mockUser: User = {
    id: '1234',
    firstName: 'john',
    lastName: 'smith',
    email: 'test@test.com',
    userName: 'test-username',
    created: new Date().toString(),
    lastUpdated: new Date().toString(),
    isActive: true,
  };
  const createUserInput = {
    firstName: mockUser.firstName,
    lastName: mockUser.lastName,
    email: mockUser.email,
    userName: mockUser.userName,
  };
  const updateUserInput = {
    id: mockUser.id,
  };
  const mockUserResponse = {
    status: 200,
    statusText: 'mock error message',
    data: mockUser,
  };
  const mockCountResponse = {
    status: 200,
    statusText: 'mock error message',
    data: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'HttpService',
          useValue: {
            get: () => of(mockUserResponse),
            post: () => of(mockUserResponse),
            put: () => of(mockCountResponse),
            delete: () => of(mockCountResponse),
          },
        },
        {
          provide: 'ConfigService',
          useValue: { get: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUserById', () => {
    it('should return expected user', done => {
      service.findUserById(mockUser.id).subscribe(result => {
        expect(result).toStrictEqual(mockUser);
        done();
      });
    });
  });

  describe('createUser', () => {
    it('should return expected user', done => {
      service.createUser(createUserInput).subscribe(result => {
        expect(result).toStrictEqual(mockUser);
        done();
      });
    });
  });

  describe('updateUser', () => {
    it('should return expected user', done => {
      service.updateUser(updateUserInput).subscribe(result => {
        expect(result).toStrictEqual(1);
        done();
      });
    });
  });

  describe('deleteUser', () => {
    it('should return expected user', done => {
      service.deleteUser(mockUser.id).subscribe(result => {
        expect(result).toStrictEqual(1);
        done();
      });
    });
  });
});
