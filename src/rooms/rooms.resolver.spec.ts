import { Test, TestingModule } from '@nestjs/testing';
import { RoomsResolver } from './rooms.resolver';
import { RoomsService } from './rooms.service';
import { UsersService } from '../users/users.service';
import { User, Room } from '../graphql.schema';
import { of } from 'rxjs';

describe('RoomsResolver', () => {
  let resolver: RoomsResolver;
  let roomService: RoomsService;
  const mockId = 1234;
  const mockUser: User = {
    id: mockId,
    firstName: 'john',
    lastName: 'smith',
  };
  const mockRoom: Room = {
    id: mockId,
    members: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoomsResolver, RoomsService, UsersService],
    }).compile();

    resolver = module.get<RoomsResolver>(RoomsResolver);
    roomService = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getUser', () => {
    it('should return expected members', done => {
      spyOn(roomService, 'findMembersByRoomId').and.returnValue(of(mockUser));
      resolver.getMembers(mockId).subscribe(result => {
        expect(result).toStrictEqual([mockUser]);
        done();
      });
    });
  });

  describe('getRoom', () => {
    it('should return expected room', done => {
      spyOn(roomService, 'findOneById').and.returnValue(of(mockRoom));
      resolver.getRoom(mockId).subscribe(result => {
        expect(result).toStrictEqual(mockRoom);
        done();
      });
    });
  });
});
