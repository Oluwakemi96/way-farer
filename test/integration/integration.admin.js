import chai from 'chai';
import chaiHttp from 'chai-http';
import 'dotenv/config';
import app from '../../src/app';
import enums from '../../src/lib/enums';
import { bus, missingBusCapacity, missingBusManufacturer, missingBusModel, missingBusPlate, missingBusYear, wrongPlateNumberFormat
} from '../payloads/payload.admin';

const { expect } = chai;
chai.use(chaiHttp);
describe('Admin Routes', () => {
  it('Should register a bus successfully', (done) => {
    chai.request(app)
      .post('/api/v1/admin/register-bus')
      .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send(bus)
      .end((err, res) => {
        expect(res.statusCode).to.equal(enums.HTTP_CREATED);
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body.message).to.equal(enums.REGISTER_BUS);
        expect(res.body.status).to.equal(enums.SUCCESS_STATUS);
        expect(res.body.data.number_plate).to.equal(bus.number_plate);
        expect(res.body.data.manufacturer).to.equal(bus.manufacturer);
        expect(res.body.data.model).to.equal(bus.model);
        expect(res.body.data.year).to.equal(bus.year);
        expect(res.body.data.capacity).to.equal(bus.capacity);
        done();
      });
  });

  it('Should return error if number_plate is not sent for bus', (done) => {
    chai.request(app)
    .post('/api/v1/admin/register-bus')
    .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send(missingBusPlate)
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
    chai.request(app)
    .post('/api/v1/admin/register-bus')
    .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send(missingBusManufacturer)
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
    chai.request(app)
    .post('/api/v1/admin/register-bus')
    .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send(missingBusModel)
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
    chai.request(app)
    .post('/api/v1/admin/register-bus')
    .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send(missingBusYear)
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
    chai.request(app)
    .post('/api/v1/admin/register-bus')
    .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send(missingBusCapacity)
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
    chai.request(app)
    .post('/api/v1/admin/register-bus')
    .set({ Authorization: process.env.WAYFARER_ADMIN_JWT_TOKEN })
      .send(wrongPlateNumberFormat)
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

});

