import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RootModule } from './../src/root.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RootModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/:name (GET)', () => {
    const name = 'John';
    return request(app.getHttpServer())
      .get(`/${name}`)
      .expect(200)
      .expect(`Hello, ${name}`);
  });
});
