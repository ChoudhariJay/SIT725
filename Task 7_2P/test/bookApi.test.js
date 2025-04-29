const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Book API Tests', () => {
  let createdBookId; // store ID for later tests

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
        createdBookId = res.body._id; // save ID for later
        done();
      });
  });

  it('PUT /api/books/:id should update the book', (done) => {
    const updatedData = {
      author: 'John Smith'
    };

    chai.request(app)
      .put(`/api/books/${createdBookId}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.author).to.equal('John Smith');
        done();
      });
  });

  it('DELETE /api/books/:id should delete the book', (done) => {
    chai.request(app)
      .delete(`/api/books/${createdBookId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').that.includes('deleted');
        done();
      });
  });
});