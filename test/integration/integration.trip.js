import chai from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../../src/app';
import enums from '../../src/lib/enums';
import * as payload from '../payloads/payload.trip';

const { expect } = chai;
chai.use(chaiHttp);
describe('Trip Routes', () => {
  it('Should register a bus successfully', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/register-bus')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send(payload.bus)
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_CREATED);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.REGISTER_BUS);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        expect(res.body.data.number_plate).to.equal(payload.bus.number_plate);
        expect(res.body.data.manufacturer).to.equal(payload.bus.manufacturer);
        expect(res.body.data.model).to.equal(payload.bus.model);
        expect(res.body.data.year).to.equal(payload.bus.year);
        expect(res.body.data.capacity).to.equal(payload.bus.capacity);
        process.env.WAYFARER_BUS_ID = res.body.data.bus_id;
        done();
      });
  });

  it('Should register bus two successfully', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/register-bus')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send(payload.bus2)
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_CREATED);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.REGISTER_BUS);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        expect(res.body.data.number_plate).to.equal(payload.bus2.number_plate);
        expect(res.body.data.manufacturer).to.equal(payload.bus2.manufacturer);
        expect(res.body.data.model).to.equal(payload.bus2.model);
        expect(res.body.data.year).to.equal(payload.bus2.year);
        expect(res.body.data.capacity).to.equal(payload.bus2.capacity);
        process.env.WAYFARER_BUS_ID_2 = res.body.data.bus_id;
        done();
      });
  });

  it('Should return error if number_plate is not sent for bus', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/register-bus')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send(payload.missingBusPlate)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('number_plate is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if manufacturer is not sent for bus', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/register-bus')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send(payload.missingBusManufacturer)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('manufacturer is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if model is not sent for bus', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/register-bus')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send(payload.missingBusModel)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('model is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if year is not sent for bus', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/register-bus')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send(payload.missingBusYear)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('year is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if capacity is not sent for bus', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/register-bus')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send(payload.missingBusCapacity)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('capacity is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if number_plate format is wrong', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/register-bus')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send(payload.wrongPlateNumberFormat)
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('invalid plate number format');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should create trip one successfully', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/create-trip')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send({
        bus_id: process.env.WAYFARER_BUS_ID,
        origin: 'Lagos',
        destination: 'Kano',
        trip_date: '2027-01-02',
        fare: 145.221
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_CREATED);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.CREATE_TRIP);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        expect(res.body.data.bus_id).to.equal(process.env.WAYFARER_BUS_ID);
        expect(res.body.data.origin).to.equal('Lagos');
        expect(res.body.data.destination).to.equal('Kano');
        expect(res.body.data.trip_date).to.equal('2027-01-01T23:00:00.000Z');
        expect(res.body.data.fare).to.equal(145.221);
        process.env.WAYFARER_TRIP_ID = res.body.data.trip_id;
        process.env.WAYFARER_BUS_ID = res.body.data.bus_id;
        done();
      });
  });

  it('Should create trip two successfully', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/create-trip')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send({
        bus_id: process.env.WAYFARER_BUS_ID_2,
        origin: 'Lagos',
        destination: 'Kaduna',
        trip_date: '2027-01-02',
        fare: 7987.5434
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_CREATED);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.CREATE_TRIP);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        expect(res.body.data.bus_id).to.equal(process.env.WAYFARER_BUS_ID_2);
        expect(res.body.data.origin).to.equal('Lagos');
        expect(res.body.data.destination).to.equal('Kaduna');
        expect(res.body.data.trip_date).to.equal('2027-01-01T23:00:00.000Z');
        expect(res.body.data.fare).to.equal(7987.5434);
        process.env.WAYFARER_TRIP_ID_2 = res.body.data.trip_id;
        process.env.WAYFARER_BUS_ID = res.body.data.bus_id;
        done();
      });
  });

  it('Should return error if bus_id is not sent for trip', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/create-trip')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send({
        origin: 'Lagos',
        destination: 'Kano',
        trip_date: '2027-01-17',
        fare: 145.221
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('bus_id is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if origin is not sent for trip', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/create-trip')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send({
        bus_id: process.env.WAYFARER_BUS_ID,
        destination: 'Kano',
        trip_date: '2023-01-17',
        fare: 145.221
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('origin is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if destination is not sent for trip', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/create-trip')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send({
        bus_id: process.env.WAYFARER_BUS_ID,
        origin: 'Lagos',
        trip_date: '2023-01-17',
        fare: 145.221
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('destination is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if trip_date is not sent for trip', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/create-trip')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send({
        bus_id: process.env.WAYFARER_BUS_ID,
        origin: 'Lagos',
        destination: 'Kano',
        fare: 145.221
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('trip_date is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if fare is not sent for trip', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/create-trip')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send({
        bus_id: process.env.WAYFARER_BUS_ID,
        origin: 'Lagos',
        destination: 'Kano',
        trip_date: '2023-01-17'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('fare is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should return error if date format is wrong', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/create-trip')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send({
        bus_id: process.env.WAYFARER_BUS_ID,
        origin: 'Lagos',
        destination: 'Kano',
        trip_date: '17-03-2023',
        fare: 145.221
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal(
          'trip_date must be in YYYY-MM-DD format'
        );
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should cancel trip status successfully', (done) => {
    chai
      .request(app)
      .put(`/api/v1/trip/trip-status/${process.env.WAYFARER_TRIP_ID}`)
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .query({
        trip_status: 'active'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.SET_TRIP_STATUS('active'));
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        done();
      });
  });

  it('Should book a trip successfully', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/book-trip')
      .set({ Authorization: process.env.WAYFARER_USER_ONE_JWT_TOKEN })
      .send({
        trip_id: process.env.WAYFARER_TRIP_ID_2,
        bus_id: process.env.WAYFARER_BUS_ID_2,
        seat_number: 12
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_CREATED);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.BOOK_TRIP);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        expect(res.body.data.trip_id).to.equal(process.env.WAYFARER_TRIP_ID_2);
        expect(res.body.data.bus_id).to.equal(process.env.WAYFARER_BUS_ID_2);
        expect(res.body.data.seat_number).to.equal(12);
        process.env.WAYFARER_BOOKING_ID = res.body.data.booking_id;
        done();
      });
  });

  it('Should book a trip successfully if seat_number is not sent', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/book-trip')
      .set({ Authorization: process.env.WAYFARER_USER_ONE_JWT_TOKEN })
      .send({
        trip_id: process.env.WAYFARER_TRIP_ID_2,
        bus_id: process.env.WAYFARER_BUS_ID_2
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_CREATED);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.BOOK_TRIP);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        expect(res.body.data.trip_id).to.equal(process.env.WAYFARER_TRIP_ID_2);
        expect(res.body.data.bus_id).to.equal(process.env.WAYFARER_BUS_ID_2);
        expect(res.body.data.seat_number).to.equal(null);
        process.env.WAYFARER_BOOKING_ID = res.body.data.booking_id;
        done();
      });
  });

  it('Should fail to book a trip if trip_id is not sent', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/book-trip')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send({
        bus_id: process.env.WAYFARER_BUS_ID_2,
        seat_number: 12
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('trip_id is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should fail to book a trip if bus_id is not sent', (done) => {
    chai
      .request(app)
      .post('/api/v1/trip/book-trip')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send({
        trip_id: process.env.WAYFARER_TRIP_ID_2,
        seat_number: 12
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body.message).to.equal('bus_id is required');
        expect(res.body.error).to.equal('UNPROCESSABLE_ENTITY');
        expect(res.body.status).to.equal(enums.ERROR_STATUS);
        done();
      });
  });

  it('Should fetch all client bookings', (done) => {
    chai
      .request(app)
      .get('/api/v1/trip/fetch-bookings')
      .set({ Authorization: process.env.WAYFARER_USER_ONE_JWT_TOKEN })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.FETCH_ALL_BOOKINGS);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        done();
      });
  });

  it('Should fetch all user bookings on a given tripId', (done) => {
    chai
      .request(app)
      .get('/api/v1/trip/fetch-bookings')
      .query({
        tripId: process.env.WAYFARER_TRIP_ID
      })
      .set({ Authorization: process.env.WAYFARER_USER_ONE_JWT_TOKEN })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.FETCH_ALL_BOOKINGS);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        done();
      });
  });

  it('Should fetch all bookings', (done) => {
    chai
      .request(app)
      .get('/api/v1/trip/admin/fetch-bookings')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.FETCH_ALL_BOOKINGS);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        done();
      });
  });

  it('Should fetch bookings of a particular trip', (done) => {
    chai
      .request(app)
      .get('/api/v1/trip/admin/fetch-bookings')
      .query({
        tripId: process.env.WAYFARER_TRIP_ID
      })
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.FETCH_ALL_BOOKINGS);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        done();
      });
  });

  it('Should fetch all trips with admin token', (done) => {
    chai
      .request(app)
      .get('/api/v1/trip/filter-trips')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.FILTER_TRIPS);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        done();
      });
  });

  it('Should fetch all trips with client token', (done) => {
    chai
      .request(app)
      .get('/api/v1/trip/filter-trips')
      .set({ Authorization: process.env.WAYFARER_USER_ONE_JWT_TOKEN })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.FILTER_TRIPS);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        done();
      });
  });

  it('Should delete user booking', (done) => {
    chai
      .request(app)
      .delete(`/api/v1/trip/delete-booking/${process.env.WAYFARER_BOOKING_ID}`)
      .set({ Authorization: process.env.WAYFARER_USER_ONE_JWT_TOKEN })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.DELETE_BOOKING);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        done();
      });
  });

  it('Should filter trips', (done) => {
    chai
      .request(app)
      .get('/api/v1/trip/filter-trips')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .query({
        origin: 'Lagos',
        destination: 'kano'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.FILTER_TRIPS);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        done();
      });
  });

  it('Should filter trips by origin', (done) => {
    chai
      .request(app)
      .get('/api/v1/trip/filter-trips')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .query({
        origin: 'Lagos'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.FILTER_TRIPS);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        done();
      });
  });

  it('Should filter trips by destination', (done) => {
    chai
      .request(app)
      .get('/api/v1/trip/filter-trips')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .query({
        origin: 'Lagos'
      })
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.FILTER_TRIPS);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        done();
      });
  });

  it('Should fetch all available buses', (done) => {
    chai
      .request(app)
      .get('/api/v1/trip/available-buses')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .end((err, res) => {
        console.log(res.body);
        expect(res.statusCode).to.equal(enums.HTTP_OK);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.AVAILABLE_BUS_FETCHED_SUCCESSFULLY);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        done();
      });
  });

});
