import { expect } from 'chai';
import sinon from 'sinon';
import enums from '../../../src/lib/enums';
import * as AdminController from '../../../src/api/controllers/controllers.admin';

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

  describe('Admin controller catch block unit testings', () => {
    it('should call register bus', async() => {
      const req = { body: undefined };
      await AdminController.registerBus(req, res, next);
      expect(res.code).to.equal(500);
      expect(res.error).to.equal('INTERNAL_SERVER_ERROR');
    });

    it('should call create trip', async() => {
      const req = { body: undefined };
      await AdminController.createTrip(req, res, next);
      expect(res.code).to.equal(500);
      expect(res.error).to.equal('INTERNAL_SERVER_ERROR');
    });

    it('should call cancel trip', async() => {
      const req = { params: undefined };
      await AdminController.cancelTrip(req, res, next);
      expect(res.code).to.equal(500);
      expect(res.error).to.equal('INTERNAL_SERVER_ERROR');
    });
  });
});

