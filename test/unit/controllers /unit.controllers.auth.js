import { expect } from 'chai';
import sinon from 'sinon';
import enums from '../../../src/lib/enums';
import * as AuthController from '../../../src/api/controllers/controllers.auth';

describe('', () => {
  let status,
    next;

  const res = {
    status: 'error',
    error: 'INTERNAL_SERVER_ERROR',
    code: enums.HTTP_INTERNAL_SERVER_ERROR
  };

  beforeEach(() => {
    status = sinon.stub();
    next = sinon.stub();
    status.returns(res);
    next.returns(res);
  });

  describe('User controller catch block unit testings', () => {
    it('should call signup user', async() => {
      const req = { body: undefined, hashedPassword: undefined };
      await AuthController.signUp(req, res, next);
      expect(res.code).to.equal(500);
      expect(res.error).to.equal('INTERNAL_SERVER_ERROR');
    });
  });

  it('should call verify user email', async() => {
    const req = { user: undefined };
    await AuthController.verifyEmail(req, res, next);
    expect(res.code).to.equal(500);
    expect(res.error).to.equal('INTERNAL_SERVER_ERROR');
  });

  it('should call user login', async() => {
    const req = { user: undefined };
    await AuthController.loginClient(req, res, next);
    expect(res.code).to.equal(500);
    expect(res.error).to.equal('INTERNAL_SERVER_ERROR');
  });

  it('should call user forgot password', async() => {
    const req = { forgot_password_token: undefined, body: undefined, expTime: undefined };
    await AuthController.forgotPassword(req, res, next);
    expect(res.code).to.equal(500);
    expect(res.error).to.equal('INTERNAL_SERVER_ERROR');
  });

  it('should call user reset password', async() => {
    const req = { hashedPassword: undefined, user: undefined };
    await AuthController.resetPassword(req, res, next);
    expect(res.code).to.equal(500);
    expect(res.error).to.equal('INTERNAL_SERVER_ERROR');
  });

});

