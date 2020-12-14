import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpModule, HttpService } from '@nestjs/common';
import * as request from 'supertest';
import { AxiosResponse } from 'axios';
import { of } from 'rxjs';
import { defaults } from 'lodash';

import { RootModule } from '../src/root.module';
import { UsersService } from '../src/users/users.service';
import { RoomsService } from '../src/rooms/rooms.service';
import { assertStatusClosure } from './test-utils';
import { CreateUserInput, UpdateUserInput, User } from '../src/graphql.schema';

describe('Graphql Controller (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  const mockUser: User = {
    id: '1234',
    firstName: 'test',
    lastName: 'user',
    email: 'test@test.com',
    userName: 'tu',
    created: Date.now().toString(),
    lastUpdated: Date.now().toString(),
    isActive: true,
  };

  const response: AxiosResponse = {
    data: mockUser,
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

  describe('getUser', () => {
    it('should return the expected user', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .type('form')
        .set('Accept', 'application/json')
        .send({
          query: `
            query getUser($userId: String!) {
              getUser(id: $userId) {
                id
                firstName
                lastName
                userName
                email
                created
                lastUpdated
                isActive
              }
            }
          `,
          variables: {
            userId: mockUser.id,
          },
        })
        .expect(assertStatusClosure(200))
        .expect(({ body }) => {
          expect(body.errors).toBeFalsy();
          const user = body.data.getUser;
          expect(user).toBeTruthy();
          expect(user.id).toBe(mockUser.id);
          expect(user.firstName).toBe(mockUser.firstName);
          expect(user.lastName).toBe(mockUser.lastName);
          expect(user.userName).toBe(mockUser.userName);
          expect(user.email).toBe(mockUser.email);
          expect(user.created).toBe(mockUser.created);
          expect(user.lastUpdated).toBe(mockUser.lastUpdated);
          expect(user.isActive).toBe(mockUser.isActive);
        });
    });

    it('should return errors for a non-existent user', () => {
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
            query getUser($userId: String!) {
              getUser(id: $userId) {
                id
                firstName
                lastName
                userName
                email
                created
                lastUpdated
                isActive
              }
            }
          `,
          variables: {
            userId: 'fakeId',
          },
        })
        .expect(assertStatusClosure(200))
        .expect(({ body }) => {
          expect(body.errors).toBeTruthy();
        });
    });
  });

  describe('createUser', () => {
    it('should return the created user', () => {
      const createUserInput: CreateUserInput = {
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        email: mockUser.email,
        userName: mockUser.userName,
      };
      return request(app.getHttpServer())
        .post('/graphql')
        .type('form')
        .set('Accept', 'application/json')
        .send({
          query: `
            mutation createUser($createUserInput: CreateUserInput!) {
              createUser(user: $createUserInput) {
                id
                firstName
                lastName
                userName
                email
                created
                lastUpdated
                isActive
              }
            }
          `,
          variables: {
            createUserInput,
          },
        })
        .expect(assertStatusClosure(200))
        .expect(({ body }) => {
          expect(body.errors).toBeFalsy();
          const user = body.data.createUser;
          expect(user).toBeTruthy();
          expect(user.id).toBe(mockUser.id);
          expect(user.firstName).toBe(mockUser.firstName);
          expect(user.lastName).toBe(mockUser.lastName);
          expect(user.userName).toBe(mockUser.userName);
          expect(user.email).toBe(mockUser.email);
          expect(user.created).toBe(mockUser.created);
          expect(user.lastUpdated).toBe(mockUser.lastUpdated);
          expect(user.isActive).toBe(mockUser.isActive);
        });
    });
  });

  describe('updateUser', () => {
    it('should return 1', () => {
      const updateUserInput: UpdateUserInput = {
        id: mockUser.id,
      };
      return request(app.getHttpServer())
        .post('/graphql')
        .type('form')
        .set('Accept', 'application/json')
        .send({
          query: `
            mutation updateUser($updateUserInput: UpdateUserInput!) {
              updateUser(userWithUpdates: $updateUserInput)
            }
          `,
          variables: {
            updateUserInput,
          },
        })
        .expect(assertStatusClosure(200))
        .expect(({ body }) => {
          expect(body.errors).toBeFalsy();
          const result = body.data.updateUser;
          expect(result).toBe(1);
        });
    });
  });

  describe('deleteUser', () => {
    it('should return 1', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .type('form')
        .set('Accept', 'application/json')
        .send({
          query: `
            mutation deleteUser($userId: String!) {
              deleteUser(id: $userId)
            }
          `,
          variables: {
            userId: mockUser.id,
          },
        })
        .expect(assertStatusClosure(200))
        .expect(({ body }) => {
          expect(body.errors).toBeFalsy();
          const result = body.data.deleteUser;
          expect(result).toBe(1);
        });
    });
  });
});
