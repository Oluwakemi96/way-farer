import chai from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../../src/app';
import enums from '../../src/lib/enums';
import { userOneProfile, userTwoProfile
} from '../payloads/payload.auth';

const { expect } = chai;
chai.use(chaiHttp);
describe('Signup', () => {
  it('Should create user one successfully', (done) => {
    chai.request(app)
      .post('/api/v1/auth/sign_up')
      .send(userOneProfile)
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_CREATED);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.ACCOUNT_CREATED);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        expect(res.body.data.email).to.equal('rashidats@gmail.com');
        expect(res.body.data.is_admin).to.equal(false);
        process.env.WAYFARER_USER_ONE_USER_ID = res.body.data.user_id;
        process.env.WAYFARER_USER_ONE_EMAIL = res.body.data.email;
        process.env.WAYFARER_USER_ONE_VERIFICATION_TOKEN = res.body.data.email_token;
        done();
      });
  });
  
  it('Should create user two successfully', (done) => {
    chai.request(app)
      .post('/api/v1/auth/sign_up')
      .send({
        ...userTwoProfile
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_CREATED);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.ACCOUNT_CREATED);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        expect(res.body.data.email).to.equal('daniel@enyata.com');
        expect(res.body.data.is_admin).to.equal(false);
        process.env.WAYFARER_USER_TWO_USER_ID = res.body.data.user_id;
        process.env.WAYFARER_USER_TWO_EMAIL = res.body.data.email;
        process.env.WAYFARER_USER_TWO_VERIFICATION_TOKEN = res.body.data.email_token;
        done();
      });
  });

  it('Should return error if email is not sent for user one', (done) => {
    chai.request(app)
      .post('/api/v1/auth/sign_up')
      .send(
        {
          first_name: userOneProfile.first_name,
          last_name: userOneProfile.last_name,
          password: userOneProfile.password
        }

      )
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal(enums.EMAIL_REQUIRED);
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if email is not sent for user two', (done) => {
    chai.request(app)
      .post('/api/v1/auth/sign_up')
      .send(
        {
          first_name: userTwoProfile.first_name,
          last_name: userTwoProfile.last_name,
          password: userTwoProfile.password
        }

      )
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal(enums.EMAIL_REQUIRED);
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if first name is not sent for user one', (done) => {
    chai.request(app)
      .post('/api/v1/auth/sign_up')
      .send(
        {
          email: userOneProfile.email,
          last_name: userOneProfile.last_name,
          password: userOneProfile.password
        }
      )
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('first_name is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });
  it('Should return error if first name is not sent for user two', (done) => {
    chai.request(app)
      .post('/api/v1/auth/sign_up')
      .send(
        {
          email: userTwoProfile.email,
          last_name: userTwoProfile.last_name,
          password: userTwoProfile.password
        }
      )
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('first_name is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
    it('Should return error if last name is not sent for user one', (done) => {
      chai.request(app)
        .post('/api/v1/auth/sign_up')
        .send(
          {
            email: userOneProfile.email,
            first_name: userOneProfile.first_name,
            password: userOneProfile.password
          }
        )
        .end((err, res) => {
          expect(res.statusCode).to.equal(422);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('status');
          expect(res.body.message).to.equal('last_name is required');
          expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
          expect(res.body.status).to.equal(enums.ERROR_STATUS);
          done();
        });
    });
  });
  it('Should return error if last name is not sent for user two', (done) => {
    chai.request(app)
      .post('/api/v1/auth/sign_up')
      .send(
        {
          email: userTwoProfile.email,
          first_name: userTwoProfile.first_name,
          password: userTwoProfile.password
        }
      )
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('last_name is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

});
