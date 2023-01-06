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
        console.log(res.body);
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

  it('Should return error if email', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        phone_number: '+2349058702000',
        referral_code: '567UJI9820'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal(enums.INVALID('referral code'));
        expect(res.body.error).to.equal('BAD_REQUEST');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });
});
