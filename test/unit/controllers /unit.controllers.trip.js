import { expect } from 'chai';
import sinon from 'sinon';
import enums from '../../../src/lib/enums';
import * as TripController from '../../../src/api/controllers/controllers.trip';

describe('', () => {
  let status, next;

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
    it('should call bus', async () => {
      const req = { data: {userId: null} };
      await TripController.registerBus(req, res, next);
      expect(res.code).to.equal(500);
      expect(res.error).to.equal('INTERNAL_SERVER_ERROR');
    });

    it('should call create trip', async () => {
      const req = { data: {userId: null} };
      await TripController.createTrip(req, res, next);
      expect(res.code).to.equal(500);
      expect(res.error).to.equal('INTERNAL_SERVER_ERROR');
    });

    it('should call trip status', async () => {
      const req = { params: undefined, query: '' };
      await TripController.updateTripStatus(req, res, next);
      expect(res.code).to.equal(500);
      expect(res.error).to.equal('INTERNAL_SERVER_ERROR');
    });

    it('should call book trip', async () => {
      const req = { body: undefined };
      await TripController.bookTrip(req, res, next);
      expect(res.code).to.equal(500);
      expect(res.error).to.equal('INTERNAL_SERVER_ERROR');
    });
    it('should call fetch all bookings', async () => {
      const req = null;
      await TripController.fetchAllBookings(req, res);
      expect(res.code).to.equal(500);
      expect(res.error).to.equal('INTERNAL_SERVER_ERROR');
    });
    it('should call fetch all user bookings', async () => {
      const req = { data: undefined };
      await TripController.fetchAllUserBookings(req, res, next);
      expect(res.code).to.equal(500);
      expect(res.error).to.equal('INTERNAL_SERVER_ERROR');
    });
  });

  it('should call delete booking', async () => {
    const req = { data: undefined };
    await TripController.deleteBooking(req, res, next);
    expect(res.code).to.equal(500);
    expect(res.error).to.equal('INTERNAL_SERVER_ERROR');
  });

  it('should call filter trips', async () => {
    const req = { query: undefined };
    await TripController.filterTrips(req, res, next);
    expect(res.code).to.equal(500);
    expect(res.error).to.equal('INTERNAL_SERVER_ERROR');
  });

  it('should call get available buses', async () => {
    const req = null;
    await TripController.filterTrips(req, res, next);
    expect(res.code).to.equal(500);
    expect(res.error).to.equal('INTERNAL_SERVER_ERROR');
  });
});
