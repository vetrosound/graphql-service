import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpModule, HttpService } from '@nestjs/common';
import * as request from 'supertest';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { defaults } from 'lodash';

import { RootModule } from '../src/root.module';
import { RoomsService } from '../src/rooms/rooms.service';
import { UsersService } from '../src/users/users.service';
import { CreateRoomInput, UpdateRoomInput, Room } from '../src/graphql.schema';
import { assertStatusClosure } from './test-utils';

describe('Graphql Controller (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  const mockRoom: Room = {
    name: 'test-room',
    owner: '1234',
    type: 'free',
    managers: ['1234'],
    created: Date.now().toString(),
    lastUpdated: Date.now().toString(),
    isActive: true,
  };

  const response: AxiosResponse = {
    data: mockRoom,
    status: 200,
    statusText: 'OK',
    headers: [],
    config: {},
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RootModule, HttpModule],
      providers: [
        RoomsService,
        UsersService,
        {
          provide: 'ConfigService',
          useValue: { get: jest.fn() },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    httpService = app.get(HttpService);
    jest.spyOn(httpService, 'get').mockReturnValue(of(response));
    jest.spyOn(httpService, 'post').mockReturnValue(of(response));
    jest
      .spyOn(httpService, 'put')
      .mockReturnValue(of(defaults({ data: 1 }, response)));
    jest
      .spyOn(httpService, 'delete')
      .mockReturnValue(of(defaults({ data: 1 }, response)));
    await app.init();
  });

  describe('getRoom', () => {
    it('should return the expect room', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .type('form')
        .set('Accept', 'application/json')
        .send({
          query: `
            query getRoom($roomName: String!) {
              getRoom(name: $roomName) {
                name
                owner
                type
                managers
                created
                lastUpdated
                isActive
              }
            }
          `,
          variables: {
            roomName: mockRoom.name,
          },
        })
        .expect(assertStatusClosure(200))
        .expect(({ body }) => {
          expect(body.errors).toBeFalsy();
          const room = body.data.getRoom;
          expect(room).toBeTruthy();
          expect(room.name).toBe(mockRoom.name);
          expect(room.owner).toBe(mockRoom.owner);
          expect(room.type).toBe(mockRoom.type);
          expect(room.managers).toEqual(mockRoom.managers);
          expect(room.created).toBe(mockRoom.created);
          expect(room.lastUpdated).toBe(mockRoom.lastUpdated);
          expect(room.isActive).toBe(mockRoom.isActive);
        });
    });

    it('should return errors for a non-existent room', () => {
      const notFoundResponse = defaults(
        { status: 404, statusText: 'Not Found' },
        response,
      );
      jest.spyOn(httpService, 'get').mockReturnValueOnce(of(notFoundResponse));
      return request(app.getHttpServer())
        .post('/graphql')
        .type('form')
        .set('Accept', 'application/json')
        .send({
          query: `
            query getRoom($roomName: String!) {
              getRoom(name: $roomName) {
                name
                owner
                type
                managers
                created
                lastUpdated
                isActive
              }
            }
          `,
          variables: {
            roomName: 'fakeName',
          },
        })
        .expect(assertStatusClosure(200))
        .expect(({ body }) => {
          expect(body.errors).toBeTruthy();
        });
    });
  });

  describe('createRoom', () => {
    it('should return the created room', () => {
      const createRoomInput: CreateRoomInput = {
        name: mockRoom.name,
        owner: mockRoom.owner,
      };
      return request(app.getHttpServer())
        .post('/graphql')
        .type('form')
        .set('Accept', 'application/json')
        .send({
          query: `
            mutation createRoom($createRoomInput: CreateRoomInput!) {
              createRoom(room: $createRoomInput) {
                name
                owner
                type
                managers
                created
                lastUpdated
                isActive
              }
            }
          `,
          variables: {
            createRoomInput,
          },
        })
        .expect(assertStatusClosure(200))
        .expect(({ body }) => {
          expect(body.errors).toBeFalsy();
          const room = body.data.createRoom;
          expect(room).toBeTruthy();
          expect(room.name).toBe(mockRoom.name);
          expect(room.owner).toBe(mockRoom.owner);
          expect(room.type).toBe(mockRoom.type);
          expect(room.managers).toEqual(mockRoom.managers);
          expect(room.created).toBe(mockRoom.created);
          expect(room.lastUpdated).toBe(mockRoom.lastUpdated);
          expect(room.isActive).toBe(mockRoom.isActive);
        });
    });
  });

  describe('updateRoom', () => {
    it('should return 1', () => {
      const updateRoomInput: UpdateRoomInput = {
        name: mockRoom.name,
      };
      return request(app.getHttpServer())
        .post('/graphql')
        .type('form')
        .set('Accept', 'application/json')
        .send({
          query: `
            mutation updateRoom($updateRoomInput: UpdateRoomInput!) {
              updateRoom(roomWithUpdates: $updateRoomInput)
            }
          `,
          variables: {
            updateRoomInput,
          },
        })
        .expect(assertStatusClosure(200))
        .expect(({ body }) => {
          expect(body.errors).toBeFalsy();
          const result = body.data.updateRoom;
          expect(result).toBe(1);
        });
    });
  });

  describe('deleteRoom', () => {
    it('should return 1', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .type('form')
        .set('Accept', 'application/json')
        .send({
          query: `
            mutation deleteRoom($roomName: String!) {
              deleteRoom(name: $roomName)
            }
          `,
          variables: {
            roomName: mockRoom.name,
          },
        })
        .expect(assertStatusClosure(200))
        .expect(({ body }) => {
          expect(body.errors).toBeFalsy();
          const result = body.data.deleteRoom;
          expect(result).toBe(1);
        });
    });
  });
});
