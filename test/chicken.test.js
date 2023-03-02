import chai from 'chai';
import chaiHttp from 'chai-http';

const should = chai.should();

chai.use(chaiHttp);

const BASE_URL = 'http://localhost:1337';

describe("CHICKEN WEB SERVICE", function ()
{
    describe("POST /chicken - Create a new chicken", function () 
    {
        it('should return 201 and a message', function (done) {
            chai.request(BASE_URL)
                .post('/chicken')
                .send({
                    name: 'test',
                    birthday: '2020-01-01',
                    weight: 1
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {

                    res.should.have.status(201);
                    res.body.message.should.be.a('string');
                    res.body.data.should.have.property('id');

                    done();
                });
        });

        it('should return 201 and a message (unset birth date)', function (done) {
            chai.request(BASE_URL)
                .post('/chicken')
                .send({
                    name: 'test',
                    weight: 1
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(201);
                    res.body.message.should.be.a('string');
                    res.body.data.should.have.property('id');

                    done();
                });
        });

        it('should return 400 and an error message (invalid birth date)', function (done) {
            chai.request(BASE_URL)
                .post('/chicken')
                .send({
                    name: 'test',
                    weight: 1,
                    birthday: 'null',
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.error.should.be.a('string');

                    done();
                });
        });

        it('should return 400 and an error message (no weight)', function (done) {
            chai.request(BASE_URL)
                .post('/chicken')
                .send({
                    name: 'test',
                    birthday: '2020-01-01',
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.error.should.be.a('string');

                    done();
                });
        });

        it('should return 400 and an error message (invalid weight)', function (done) {
            chai.request(BASE_URL)
                .post('/chicken')
                .send({
                    name: 'test',
                    birthday: '2020-01-01',
                    weight: 'null'
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    res.should.have.status(400);
                    res.body.error.should.be.a('string');

                    done();
                });
        });
    });

    describe("GET /chicken - Get all chickens", function ()
    {
        it('should return 200 and a list of chickens', function (done) {
            chai.request(BASE_URL)
                .get('/chicken')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data[0].should.have.property('id');
                    res.body.data[0].should.have.property('name');
                    res.body.data[0].should.have.property('birthday');
                    res.body.data[0].should.have.property('weight');
                    res.body.data[0].should.have.property('isRunning');

                    done();
                });
        });
    });

    describe("GET /chicken/:id - Get a chicken by id", function ()
    {
        it('should return 200 and a chicken', function (done) {
            chai.request(BASE_URL)
                .get('/chicken/1')
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('id');
                    res.body.data.should.have.property('name');
                    res.body.data.should.have.property('birthday');
                    res.body.data.should.have.property('weight');
                    res.body.data.should.have.property('isRunning');

                    done();
                });
        });

        it('should return 404 and an error message (invalid id)', function (done) {
            chai.request(BASE_URL)
                .get('/chicken/0')
                .end(function (err, res) {
                    res.should.have.status(404);
                    res.body.error.should.be.a('string');

                    done();
                });
        });
    });

    describe("DELETE /chicken/:id - Delete a chicken by id", function () {
        it('should return 202 and a message', function (done) {
            chai.request(BASE_URL)
                .post('/chicken')
                .send({
                    name: 'test',
                    birthday: '2020-01-01',
                    weight: 1
                })
                .set('Content-Type', 'application/json')
                .end(function (err, res) {
                    chai.request(BASE_URL)
                        .delete('/chicken/' + res.body.data.id)
                        .end(function (err, res) {
                            res.should.have.status(202);
                            res.body.message.should.be.a('string');
                            res.body.data.should.have.property('id');

                            done();
                        });
                });
        })

        it('should return 404 and an error message (invalid id)', function (done) {
            chai.request(BASE_URL)
                .delete('/chicken/0')
                .end(function (err, res) {
                    res.should.have.status(404);
                    res.body.error.should.be.a('string');

                    done();
                });
        });
    });

});