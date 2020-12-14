import { Test, TestingModule } from '@nestjs/testing';
import { RoomsResolver } from './rooms.resolver';
import { RoomsService } from './rooms.service';
import { UsersService } from '../users/users.service';
import { Room } from '../graphql.schema';
import { of } from 'rxjs';

describe('RoomsResolver', () => {
  let resolver: RoomsResolver;
  let roomsService: RoomsService;
  const mockRoom: Room = {
    name: 'test-room',
    owner: '1234',
    type: 'paid',
    managers: ['1234'],
    created: new Date().toString(),
    lastUpdated: new Date().toString(),
    isActive: true,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsResolver,
        RoomsService,
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

    resolver = module.get<RoomsResolver>(RoomsResolver);
    roomsService = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getRoom', () => {
    it('should return expected room', done => {
      spyOn(roomsService, 'findRoomByName').and.returnValue(of(mockRoom));
      resolver.getRoom(mockRoom.name).subscribe(result => {
        expect(result).toStrictEqual(mockRoom);
        done();
      });
    });
  });

  describe('createRoom', () => {
    it('should return created room', done => {
      const createRoomInput = { name: mockRoom.name, owner: mockRoom.owner };
      spyOn(roomsService, 'createRoom').and.returnValue(of(mockRoom));
      resolver.createRoom(createRoomInput).subscribe(result => {
        expect(result).toStrictEqual(mockRoom);
        done();
      });
    });
  });

  describe('updateRoom', () => {
    it('should return 1', done => {
      const updateRoomInput = { name: mockRoom.name };
      spyOn(roomsService, 'updateRoom').and.returnValue(of(1));
      resolver.updateRoom(updateRoomInput).subscribe(result => {
        expect(result).toBe(1);
        done();
      });
    });
  });

  describe('deleteRoom', () => {
    it('should return 1', done => {
      spyOn(roomsService, 'deleteRoom').and.returnValue(of(1));
      resolver.deleteRoom(mockRoom.name).subscribe(result => {
        expect(result).toBe(1);
        done();
      });
    });
  });
});
