import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from 'src/app.module';

describe('Client Endpoints (e2e)', () => {
  let app: INestApplication;
  let accessToken: string;
  let createdClientId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    const randomHash =  Math.floor(Math.random() * 100000);
    const randomEmail = `${Date.now()}${randomHash}@example.com`;
    const res = await request(app.getHttpServer())
      .post('/auth/sign-up')
      .send({ email: randomEmail, password: '123456' });

      accessToken = res.body.access_token;
  });

  it('should create a client', async () => {
    const randomEmail = `${Date.now()}@example.com`;

    const res = await request(app.getHttpServer())
      .post('/client')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Cliente Teste',
        email: randomEmail,
        dateOfBirth: '1990-01-01',
      });

    expect(res.status).toBe(201);
    expect(res.body.data).toHaveProperty('id');
    createdClientId = String(res.body.data.id);
  });

  it('should search client by name', async () => {
    const res = await request(app.getHttpServer())
    .get('/client')
    .set('Authorization', `Bearer ${accessToken}`)
    .query({
      page: 1,
      page_size: 10,
      filter_by: 'name',
      order_by: 'createdAt',
      order_direction: 'ASC',
      name: 'Cliente',
    });

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
  });

  it('shoudl edit client', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/client/${createdClientId}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ name: 'Cliente Editado' });

      expect(res.status).toBe(200);
    });

  it('should delete client', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/client/${createdClientId}`)
      .set('Authorization', `Bearer ${accessToken}`);

      expect(res.status).toBe(200);
  });

  afterAll(async () => {
    await app.close();
  });
});