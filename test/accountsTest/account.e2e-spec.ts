import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import exp = require('constants');

describe('Account E2E 테스트', () => {
  let app: INestApplication;
  let id: string;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init().then(() => console.log(`app이 정상적으로 생성되었습니다.`));
  });

  beforeEach(async (done) => {
    request(app.getHttpServer())
      .post('/accounts')
      .send({
        'email': 'test@email.com',
        'password': 'S12345678'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        id = res.body.id;
        accessToken = res.body.accessToken;
        expect(accessToken).toBeDefined();
        expect(id).toBeDefined();
        expect(res.body.email).toBe('test@email.com');
        console.log(`BeforeEach로 미리 데이터 넣어두기`);
        done();
      });
  }, 10000)

  test('GET /accounts?email=:email&password=:password', async (done) => {
    request(app.getHttpServer())
      .get('/accounts')
      .query({'email': 'test@email.com', 'password':'S12345678'})
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        console.log(res.body);
        expect(res.body.email).toBe('test@email.com');
        done();
      })
  }, 10000);

  test('GET /accounts/:id', async (done) => {
    request(app.getHttpServer())
      .get(`/accounts/${id}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200)
      .end((err, res) => {
        expect(res.body.email).toBe('test@email.com')
        expect(res.body.accessToken).toBeDefined();
        expect(res.body.id).toBeDefined();
        done();
      });
  });

  test('Login Fail', async (done) => {
    request(app.getHttpServer())
      .get('/accounts')
      .query({'email': 'test@email.com', 'password':'S1234567'})
      .expect(401)
      .end((err, res) => {
        expect(res.body.message).toBe('Password is wrong');
        done();
      });
  });

  test('Token이 다를때', async (done) => {
    request(app.getHttpServer())
      .get(`/accounts/${id}`)
      .set('Authorization', 'Bearer ' + 'wrong token')
      .expect(401)
      .end((err, res) => {
        console.log(res.body);
        expect(res.body.error).toBe('Unauthorized');
        done();
      });
  })

  afterEach(async (done) => {
    request(app.getHttpServer())
      .delete(`/accounts/${id}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200)
      .end((err, res) => {
        console.log(`${id}가 삭제되었습니다.`);
        expect(res.body.message).toBe('deleted');
        done();
      });
  });

  afterAll(async (done) => {
    await app.close();
    console.log(`app closed`);
    done();
  });
});


describe('PUT /accounts/:id', () => {
  let app: INestApplication;
  let id: string;
  let accessToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init().then(() => console.log(`app이 정상적으로 생성되었습니다.`));
  });

  beforeEach(async (done) => {
    request(app.getHttpServer())
      .post('/accounts')
      .send({
        'email': 'put@email.com',
        'password': 'S12345678'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .end((err, res) => {
        if (err) throw err;
        id = res.body.id;
        accessToken = res.body.accessToken;
        expect(accessToken).toBeDefined();
        expect(id).toBeDefined();
        expect(res.body.email).toBe('put@email.com');
        done();
      });
  }, 10000)

  test('PUT /accounts/:id', async (done) => {
    request(app.getHttpServer())
      .put(`/accounts/${id}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .send({'email': 'update@gmail.com', 'password':'S12345678'})
      .expect(200)
      .end((err, res) => {
        if (err) throw err;
        accessToken = res.body.accessToken;
        expect(res.body.email).toBe('update@gmail.com');
        done();
      })
  }, 10000);

  test('업데이트할때, token이 다른 경우', async (done) => {
    request(app.getHttpServer())
      .put(`/accounts/${id}`)
      .set('Authorization', 'Bearer ' + 'accessToken')
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        console.log(res.body);
        expect(res.body.error).toBe('Unauthorized');
        done();
      })
  }, 10000);

  test('업데이트할때, id가 다른 경우', async (done) => {
    request(app.getHttpServer())
      .put(`/accounts/wrongId`)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(401)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.message).toBe('수정권한이 없습니다.');
        expect(res.body.error).toBe('Unauthorized');
        done();
      })
  }, 10000);

  test('삭제할때, ID가 없거나 다른 경우', async (done) => {
    request(app.getHttpServer())
      .delete(`/accounts/wrongId`)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(401)
      .end((err, res) => {
        expect(res.body.message).toBe('삭제할 권한이 없습니다.');
        expect(res.body.error).toBe('Unauthorized');
        done();
      });
  })

  afterEach(async (done) => {
    request(app.getHttpServer())
      .delete(`/accounts/${id}`)
      .set('Authorization', 'Bearer ' + accessToken)
      .expect(200)
      .end((err, res) => {
        console.log(`${id}가 삭제되었습니다.`);
        expect(res.body.message).toBe('deleted');
        done();
      });
  });

  afterAll(async (done) => {
    await app.close();
    console.log(`app closed`);
    done();
  });
});

describe('email, password validate 테스트', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init().then(() => console.log(`app이 정상적으로 생성되었습니다.`));
  });

  test('회원가입할때, validation Fail나는 경우',async (done) => {
    request(app.getHttpServer())
      .post('/accounts')
      .send({
        'email': 'email.com',
        'password': '12345678'
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(400)
      .end((err, res) => {
        if (err) throw err;
        expect(res.body.error).toBe('Bad Request');
        console.log(`validate : ${JSON.stringify(res.body)}`);
        done();
      });
  }, 10000)

  afterAll(async (done) => {
    await app.close();
    console.log(`app closed`);
    done();
  });
});
