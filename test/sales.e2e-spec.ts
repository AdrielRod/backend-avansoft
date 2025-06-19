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



  it('should create a sale', async () => {
    const randomHash =  Math.floor(Math.random() * 100000);
    const randomEmail = `${Date.now()}${randomHash}@example.com`;

    const client = await request(app.getHttpServer())
      .post('/client')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Cliente Teste',
        email: randomEmail,
        dateOfBirth: '1990-01-01',
    })
    
    const client_id = String(client.body.data.id);

    const res = await request(app.getHttpServer())
      .post('/sales')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        client_id,
        value: 30,
        date: '1990-01-01',
      });

    expect(res.status).toBe(201);
  });

  it('should get sales of today', async () => {
    const res = await request(app.getHttpServer())
      .get('/sales/per-day')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should get top sales and clients', async () => {
    const res = await request(app.getHttpServer())
      .get('/sales/top')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});