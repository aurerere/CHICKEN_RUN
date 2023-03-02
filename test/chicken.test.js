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

    describe("GET /chicken - Get all chickens", function () {
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
});