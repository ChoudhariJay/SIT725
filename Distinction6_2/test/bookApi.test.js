const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // assuming you exported app in app.js
const expect = chai.expect;

chai.use(chaiHttp);

describe('Book API Tests', () => {
  it('GET /api/books should return status 200 and an array', (done) => {
    chai.request(app)
      .get('/api/books')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('POST /api/books should create a book', (done) => {
    const book = {
      title: 'Testing Book',
      author: 'Jane Doe',
      genre: 'Fiction',
      year: 2025
    };

    chai.request(app)
      .post('/api/books')
      .send(book)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('_id');
        expect(res.body.title).to.equal('Testing Book');
        done();
      });
  });
});