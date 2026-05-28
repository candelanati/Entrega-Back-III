import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import mongoose from 'mongoose';
import { createApp } from '../src/app.js';

const oid = () => new mongoose.Types.ObjectId().toString();

const errorWithStatus = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

describe('pruebas funcionales de adoption.router', () => {
  let service;
  let app;

  beforeEach(() => {
    service = {
      getAllAdoptions: sinon.stub(),
      getAdoptionById: sinon.stub(),
      createAdoption: sinon.stub()
    };
    app = createApp({ adoptionService: service });
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('GET /api/adoptions', () => {
    it('devuelve todas las adopciones', async () => {
      const payload = [{ _id: oid(), owner: oid(), pet: oid() }];
      service.getAllAdoptions.resolves(payload);

      const response = await request(app).get('/api/adoptions').expect(200);

      expect(response.body).to.deep.equal({ status: 'success', payload });
      expect(service.getAllAdoptions.calledOnce).to.equal(true);
    });
  });

  describe('GET /api/adoptions/:aid', () => {
    it('devuelve una adopcion cuando existe', async () => {
      const adoption = { _id: oid(), owner: oid(), pet: oid() };
      service.getAdoptionById.resolves(adoption);

      const response = await request(app).get(`/api/adoptions/${adoption._id}`).expect(200);

      expect(response.body).to.deep.equal({ status: 'success', payload: adoption });
      expect(service.getAdoptionById.calledOnceWithExactly(adoption._id)).to.equal(true);
    });

    it('devuelve 404 cuando la adopcion no existe', async () => {
      const adoptionId = oid();
      service.getAdoptionById.resolves(null);

      const response = await request(app).get(`/api/adoptions/${adoptionId}`).expect(404);

      expect(response.body).to.deep.equal({ status: 'error', error: 'Adopcion no encontrada' });
    });

    it('devuelve 400 cuando el id de adopcion es invalido', async () => {
      service.getAdoptionById.rejects(errorWithStatus('id de adopcion invalido', 400));

      const response = await request(app).get('/api/adoptions/not-a-valid-id').expect(400);

      expect(response.body).to.deep.equal({ status: 'error', error: 'id de adopcion invalido' });
    });
  });

  describe('POST /api/adoptions/:uid/:pid', () => {
    it('crea una adopcion y marca la mascota como adoptada', async () => {
      const userId = oid();
      const petId = oid();
      const adoption = { _id: oid(), owner: userId, pet: petId };
      service.createAdoption.resolves(adoption);

      const response = await request(app).post(`/api/adoptions/${userId}/${petId}`).expect(201);

      expect(response.body).to.deep.equal({ status: 'success', message: 'Mascota adoptada', payload: adoption });
      expect(service.createAdoption.calledOnceWithExactly(userId, petId)).to.equal(true);
    });

    it('devuelve 404 cuando el usuario no existe', async () => {
      service.createAdoption.rejects(errorWithStatus('Usuario no encontrado', 404));

      const response = await request(app).post(`/api/adoptions/${oid()}/${oid()}`).expect(404);

      expect(response.body).to.deep.equal({ status: 'error', error: 'Usuario no encontrado' });
    });

    it('devuelve 404 cuando la mascota no existe', async () => {
      service.createAdoption.rejects(errorWithStatus('Mascota no encontrada', 404));

      const response = await request(app).post(`/api/adoptions/${oid()}/${oid()}`).expect(404);

      expect(response.body).to.deep.equal({ status: 'error', error: 'Mascota no encontrada' });
    });

    it('devuelve 400 cuando la mascota ya esta adoptada', async () => {
      service.createAdoption.rejects(errorWithStatus('La mascota ya esta adoptada', 400));

      const response = await request(app).post(`/api/adoptions/${oid()}/${oid()}`).expect(400);

      expect(response.body).to.deep.equal({ status: 'error', error: 'La mascota ya esta adoptada' });
    });

    it('devuelve 400 cuando un id de ruta es invalido', async () => {
      service.createAdoption.rejects(errorWithStatus('id de usuario invalido', 400));

      const response = await request(app).post(`/api/adoptions/bad-id/${oid()}`).expect(400);

      expect(response.body).to.deep.equal({ status: 'error', error: 'id de usuario invalido' });
    });
  });
});
