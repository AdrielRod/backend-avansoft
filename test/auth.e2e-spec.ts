import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('Client Endpoints (e2e)', () => {
  let app: INestApplication;
  let email: string;
  let refresh_token: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const randomHash =  Math.floor(Math.random() * 100000);
     email = `${Date.now()}${randomHash}@example.com`;
    const res = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({ email, password: '123456' });

    refresh_token = res.body.refresh_token;

  });

  it('should make sign in', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({
        email,
        password: '123456',
      });

    expect(res.status).toBe(200);
  });

  it('should refresh token', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/refresh-token')
      .send({
        refresh_token,
      });

    expect(res.status).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});