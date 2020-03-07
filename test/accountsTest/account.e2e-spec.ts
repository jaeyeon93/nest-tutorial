import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';

describe('account controller e2e test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init().then(() => console.log(`app이 정상적으로 생성되었습니다.`));
  });

  it('GET /', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        console.log(res.body);
      })
  });

  it('POST /accounts', async (done) => {
    request(app.getHttpServer())
      .post('/accounts')
      .send({
        'email': 'te@email.com',
        'password': 'S12345678'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        const data = res.text;
        console.log(typeof data);
        console.log(JSON.stringify(data));
        done();
      });
  }, 10000);

  afterAll(async () => {
    await app.close();
  });
});
