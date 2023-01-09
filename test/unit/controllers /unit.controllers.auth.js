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

});