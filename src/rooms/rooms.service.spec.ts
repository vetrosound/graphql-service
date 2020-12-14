import { Test, TestingModule } from '@nestjs/testing';
import { RoomsService } from './rooms.service';
import { Room } from 'src/graphql.schema';
import { of } from 'rxjs';

describe('RoomsService', () => {
  let service: RoomsService;
  const mockRoom: Room = {
    name: 'test-room',
    owner: '1234',
    type: 'paid',
    managers: ['1234'],
    created: new Date().toString(),
    lastUpdated: new Date().toString(),
    isActive: true,
  };
  const createRoomInput = { name: mockRoom.name, owner: mockRoom.owner };
  const updateRoomInput = { name: mockRoom.name };
  const mockRoomResponse = {
    status: 200,
    statusText: 'mock error message',
    data: mockRoom,
  };
  const mockCountResponse = {
    status: 200,
    statusText: 'mock error message',
    data: 1,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomsService,
        {
          provide: 'HttpService',
          useValue: {
            get: () => of(mockRoomResponse),
            post: () => of(mockRoomResponse),
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

    service = module.get<RoomsService>(RoomsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findRoomById', () => {
    it('should return expected room', done => {
      service.findRoomByName(mockRoom.name).subscribe(result => {
        expect(result).toStrictEqual(mockRoom);
        done();
      });
    });
  });

  describe('createRoom', () => {
    it('should return expected room', done => {
      service.createRoom(createRoomInput).subscribe(result => {
        expect(result).toStrictEqual(mockRoom);
        done();
      });
    });
  });

  describe('updateRoom', () => {
    it('should return expected room', done => {
      service.updateRoom(updateRoomInput).subscribe(result => {
        expect(result).toStrictEqual(1);
        done();
      });
    });
  });

  describe('deleteRoom', () => {
    it('should return expected room', done => {
      service.deleteRoom(mockRoom.name).subscribe(result => {
        expect(result).toStrictEqual(1);
        done();
      });
    });
  });
});
