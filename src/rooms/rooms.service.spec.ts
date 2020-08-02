import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';
import { UsersService } from '../users/users.service';
import { User } from 'src/graphql.schema';
import { of } from 'rxjs';
import { toArray } from 'rxjs/operators';

describe('RoomsService', () => {
  let roomsService: RoomsService;
  let usersService: UsersService;
  const mockId = 1234;
  const mockUser: User = {
    id: mockId,
    firstName: 'john',
    lastName: 'smith',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomsService, UsersService],
    }).compile();

    roomsService = module.get<RoomsService>(RoomsService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(roomsService).toBeDefined();
  });

  describe('findOneById', () => {
    it('should return expected room', done => {
      roomsService.findOneById(mockId).subscribe(result => {
        expect(result).toStrictEqual({ id: mockId });
        done();
      });
    });
  });

  describe('findMembersByRoomId', () => {
    it('should return the expected members', done => {
      spyOn(usersService, 'findAllByIds').and.returnValue(of(mockUser));
      roomsService
        .findMembersByRoomId(mockId)
        .pipe(toArray())
        .subscribe(result => {
          expect(result).toStrictEqual([mockUser]);
          done();
        });
    });
  });
});
