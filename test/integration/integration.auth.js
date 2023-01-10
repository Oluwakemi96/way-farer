import chai from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../../src/app';
import enums from '../../src/lib/enums';
import { userOneProfile, userTwoProfile, loginUserOne, loginUserTwo
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

describe('Login', () => {
  it('Should verify user one email successfully', (done) => {
    chai.request(app)
      .put(`/api/v1/auth/verify-email/${process.env.WAYFARER_USER_ONE_VERIFICATION_TOKEN}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.VERIFY_CLIENT_EMAIL);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        done();
      });
  });

  it('Should verify user two email successfully', (done) => {
    chai.request(app)
      .put(`/api/v1/auth/verify-email/${process.env.WAYFARER_USER_TWO_VERIFICATION_TOKEN}`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.VERIFY_CLIENT_EMAIL);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        done();
      });
  });

  it('Should not verify user email if token is invalid', (done) => {
    chai.request(app)
      .put(`/api/v1/auth/verify-email/1234`)
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal(enums.TOKEN_ABSENT_OR_EXPIRED);
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if invalid email is sent for user one', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(
        {
          email: `${userOneProfile.email}...`,
        }
      )
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('email must be a valid email');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if email is sent for user two', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(
        {
          email: `${userTwoProfile.email}...`,
        }
      )
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('email must be a valid email');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if email is not sent for user one', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(
        {
          password: userOneProfile.password
        }
      )
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('email is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if email is not sent for user two', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(
        {
          password: userTwoProfile.password
        }
      )
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('email is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if email is not sent for admin', (done) => {
    chai.request(app)
      .post('/api/v1/auth/admin/login')
      .send(
        {
          password: "sikirurashidat"
        }
      )
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('email is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });


  it('Should return error if password is not sent for user one', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(
        {
          email: userOneProfile.email,
        }
      )
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('password is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if password is not sent for user two', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(
        {
          email: userTwoProfile.email,
        }
      )
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('password is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if password is not sent for admin', (done) => {
    chai.request(app)
      .post('/api/v1/auth/admin/login')
      .send(
        {
          email: "admin@wayfarer.org",
        }
      )
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('password is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should login user one successfully', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginUserOne)
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.LOGIN_USER);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        expect(res.body.data.email).to.equal('rashidats@gmail.com');
        expect(res.body.data.is_admin).to.equal(false);
        process.env.WAYFARER_USER_ONE_USER_ID = res.body.data.user_id;
        process.env.WAYFARER_USER_ONE_EMAIL = res.body.data.email;
        process.env.WAYFARER_USER_ONE_JWT_TOKEN = res.body.data.token;
        done();
      });
  });

  it('Should login user two successfully', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(loginUserTwo)
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.LOGIN_USER);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        expect(res.body.data.email).to.equal('daniel@enyata.com');
        expect(res.body.data.is_admin).to.equal(false);
        process.env.WAYFARER_USER_ONE_USER_ID = res.body.data.user_id;
        process.env.WAYFARER_USER_ONE_EMAIL = res.body.data.email;
        process.env.WAYFARER_USER_ONE_JWT_TOKEN = res.body.data.token;
        done();
      });
  });
})

it('Should login admin successfully', (done) => {
  chai.request(app)
    .post('/api/v1/auth/admin/login')
    .send({
      email: "admin@wayfarer.org",
      password: "sikirurashidat"
    })
    .end((err, res) => {
      expect(res.statusCode).to.equal(enums.HTTP_OK);
      expect(res.body).to.have.property('message');
      expect(res.body).to.have.property('status');
      expect(res.body).to.have.property('data');
      expect(res.body.message).to.equal(enums.LOGIN_USER);
      expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
      expect(res.body.data.email).to.equal('admin@wayfarer.org');
      expect(res.body.data.is_admin).to.equal(true);
      process.env.WAYFARER_ADMIN_USER_ID = res.body.data.user_id;
      process.env.WAYFARER_ADMIN_EMAIL = res.body.data.email;
      process.env.WAYFARER_ADMIN_JWT_TOKEN = res.body.data.token;
      done();
    });
});

describe('forgot password', () => {
  it('Should send a reset password link successfully to user one ', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot_password')
      .send({
        email: userOneProfile.email
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal(enums.FORGOT_PASSWORD);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        process.env.WAYFARER_USER_ONE_PASSWORD_RESET_TOKEN = res.body.data;
        done();
      });
  });

  it('Should return error if email is not sent for user one', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot_password')
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('email is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });
  
  it('Should return error if invalid email is sent for user one', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot_password')
      .send({
        email: `${userOneProfile.email}jdkdjhdjhs`
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('email must be a valid email');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should send a reset password link successfully to user two', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot_password')
      .send({
        email: userTwoProfile.email
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal(enums.FORGOT_PASSWORD);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        process.env.WAYFARER_USER_TWO_PASSWORD_RESET_TOKEN = res.body.data;
        done();
      });
  });

  it('Should return error if email is not sent for user two', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot_password')
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('email is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if invalid email is sent for user two', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot_password')
      .send({
        email: `${userOneProfile.email}jdkdjhdjhs`
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('email must be a valid email');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });
});

  it('Should return error if invalid email is sent for admin', (done) => {
    chai.request(app)
      .post('/api/v1/auth/forgot_password')
      .send({
        email: 'admin@wayfarerorgjdkdjhdjhs'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('email must be a valid email');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

describe('reset password', () => {
  it('Should successfully reset user one password ', (done) => {
    chai.request(app)
      .patch('/api/v1/auth/reset_password')
      .query({
        password_token: process.env.WAYFARER_USER_ONE_PASSWORD_RESET_TOKEN
      })
      .send({
        password: 'boladeJohnson'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal(enums.PASSWORD_RESET);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        done();
      });
  });

  it('Should throw error if invalid token is sent for user one', (done) => {
    chai.request(app)
      .patch('/api/v1/auth/reset_password')
      .query({
        password_token: `${process.env.WAYFARER_USER_ONE_PASSWORD_RESET_TOKEN}hdhhjdgs`
      })
      .send({
        password: 'boladeAyobami'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal(enums.INVALID_TOKEN);
        expect(res.body.error).to.equal('NOT_FOUND');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should throw error if password is not sent for user one', (done) => {
    chai.request(app)
      .patch('/api/v1/auth/reset_password')
      .query({
        password_token: process.env.WAYFARER_USER_ONE_PASSWORD_RESET_TOKEN
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('password is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should throw error if token is not sent for user one', (done) => {
    chai.request(app)
      .patch('/api/v1/auth/reset_password')
      .send({
        password: 'boladeAyobami'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('password_token is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should successfully reset user two password ', (done) => {
    chai.request(app)
      .patch('/api/v1/auth/reset_password')
      .query({
        password_token: process.env.WAYFARER_USER_TWO_PASSWORD_RESET_TOKEN
      })
      .send({
        password: 'boladeJohnson'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal(enums.PASSWORD_RESET);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        done();
      });
  });
  
  it('Should throw error if invalid token is sent for user two', (done) => {
    chai.request(app)
      .patch('/api/v1/auth/reset_password')
      .query({
        password_token: `${process.env.WAYFARER_USER_TWO_PASSWORD_RESET_TOKEN}hdhhjdgs`
      })
      .send({
        password: 'boladeAyobami'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(404);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal(enums.INVALID_TOKEN);
        expect(res.body.error).to.equal('NOT_FOUND');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should throw error if password is not sent for user two', (done) => {
    chai.request(app)
      .patch('/api/v1/auth/reset_password')
      .query({
        password_token: process.env.WAYFARER_USER_ONE_PASSWORD_RESET_TOKEN
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('password is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should throw error if token is not sent for user two', (done) => {
    chai.request(app)
      .patch('/api/v1/auth/reset_password')
      .send({
        password: 'boladeAyobami'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('password_token is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });
});

