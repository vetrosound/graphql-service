import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RootModule } from '../src/root.module';

describe('Graphql Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RootModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('getRoom', () => {
    const expectedId = 1234;
    const expectedFirst = 'john';
    const expectedLast = 'smith';
    const query = `
      query getRoom($id: Int!) {
        room(id: $id) {
          id
          members(roomId: $id) {
            id
            firstName
            lastName
          }
        }
      }
    `;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: 'getRoom',
        variables: { id: expectedId },
        query,
      })
      .expect(200)
      .expect(({ body }) => {
        const room = body.data.room;
        expect(room).toBeDefined();
        expect(room.id).toBe(expectedId);
        expect(room.members).toBeDefined();
        expect(room.members.length).toBe(1);
        expect(room.members[0].firstName).toBe(expectedFirst);
        expect(room.members[0].lastName).toBe(expectedLast);
      });
  });

  it('getUser', () => {
    const expectedId = 1234;
    const expectedFirst = 'john';
    const expectedLast = 'smith';
    const query = `
      query getUser($id: Int!) {
        user(id: $id) {
          id
          firstName
          lastName
        }
      }
    `;
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: 'getUser',
        variables: { id: expectedId },
        query,
      })
      .expect(200)
      .expect(({ body }) => {
        const user = body.data.user;
        expect(user).toBeDefined();
        expect(user.id).toBe(expectedId);
        expect(user.firstName).toBe(expectedFirst);
        expect(user.lastName).toBe(expectedLast);
      });
  });
});
