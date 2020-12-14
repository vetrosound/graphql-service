import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { User } from '../graphql.schema';
import { of } from 'rxjs';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let usersService: UsersService;
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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        UsersService,
        {
          provide: 'HttpService',
          useValue: jest.fn(),
        },
        {
          provide: 'ConfigService',
          useValue: { get: jest.fn() },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getUser', () => {
    it('should return the expected user', done => {
      spyOn(usersService, 'findUserById').and.returnValue(of(mockUser));
      resolver.getUser(mockUser.id).subscribe(result => {
        expect(result).toStrictEqual(mockUser);
        done();
      });
    });
  });

  describe('createUser', () => {
    it('should return the created user', done => {
      const createUserInput = {
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
        userName: mockUser.userName,
      };
      spyOn(usersService, 'createUser').and.returnValue(of(mockUser));
      resolver.createUser(createUserInput).subscribe(result => {
        expect(result).toStrictEqual(mockUser);
        done();
      });
    });
  });

  describe('updateUser', () => {
    it('should return 1', done => {
      const updateUserInput = {
        id: mockUser.id,
      };
      spyOn(usersService, 'updateUser').and.returnValue(of(1));
      resolver.updateUser(updateUserInput).subscribe(result => {
        expect(result).toBe(1);
        done();
      });
    });
  });

  describe('deleteUser', () => {
    it('should return 1', done => {
      spyOn(usersService, 'deleteUser').and.returnValue(of(1));
      resolver.deleteUser(mockUser.id).subscribe(result => {
        expect(result).toBe(1);
        done();
      });
    });
  });
});
