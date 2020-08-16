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
    const expectedRoomId = 1234;
    const expectedUserId1 = 1234;
    const expectedUserId2 = 56;
    const expectedUserId3 = 78;
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
        variables: { id: expectedRoomId },
        query,
      })
      .expect(200)
      .expect(({ body }) => {
        const room = body.data.room;
        expect(room).toBeDefined();
        expect(room.id).toBe(expectedRoomId);
        expect(room.members).toBeDefined();
        expect(room.members.length).toBe(3);
        expect(room.members[0].id).toBe(expectedUserId1);
        expect(room.members[0].firstName).toBe(expectedFirst);
        expect(room.members[0].lastName).toBe(expectedLast);
        expect(room.members[1].id).toBe(expectedUserId2);
        expect(room.members[1].firstName).toBe(expectedFirst);
        expect(room.members[1].lastName).toBe(expectedLast);
        expect(room.members[2].id).toBe(expectedUserId3);
        expect(room.members[2].firstName).toBe(expectedFirst);
        expect(room.members[2].lastName).toBe(expectedLast);
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
