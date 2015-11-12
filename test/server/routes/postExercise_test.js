var httpMocks = require('node-mocks-http');
var expect = require('chai').expect;
var sinon = require('sinon');
var fs = require('fs');
var _ = require('lodash');

describe('postExercise', function () {
    var postExercise = require('../../../server/api/postExercise.js');
    var req;
    var res;

    beforeEach(function () {
        req = httpMocks.createRequest({
            method: 'POST',
            url: '/api/exercises/1',
            params: {
                exercise: '1'
            },
            body: {
                answer: 'function () { return "Hello World!"; }'
            }
        });

        res = httpMocks.createResponse();
    });

    it('should respond', function (done) {
        res.json = sinon.spy();

        postExercise(req, res).then(() => {
            expect(res.json.called).to.equal(true);
            done();
        });
    });

    it('should return the results of the exercise', function (done) {
        var parsedResponse;

        postExercise(req, res).then(() => {
            parsedResponse = JSON.parse(res._getData());
            expect(typeof parsedResponse).to.equal('object');
            done();
        });
    });

    it('should handle multiple parameters as test inputs', (done) => {
        this.timeout(5000);
        
        req = httpMocks.createRequest({
            method: 'POST',
            url: '/api/exercises/5',
            params: {
                exercise: '5'
            },
            body: {
                answer: 'function(a, b) { return a + b; }'
            }
        });

        res = httpMocks.createResponse();

        let parsedResponse;

        postExercise(req, res).then(() => {
            parsedResponse = JSON.parse(res._getData());
            expect(parsedResponse[0].output).to.equal(2);
            done();
        }).catch((e) => {
            console.log('multiple parameters parsing error: ', e);
        });
    });

    it('should handle arrays as test inputs', (done) => {
        req = httpMocks.createRequest({
            method: 'POST',
            url: '/api/exercises/3',
            params: {
                exercise: '3'
            },
            body: {
                answer: 'function (array) { return array.reduce(function(a, b) { return a + b; }); }'
            }
        });

        res = httpMocks.createResponse();

        let parsedResponse;

        postExercise(req, res).then(() => {
            parsedResponse = JSON.parse(res._getData());
            expect(parsedResponse[0].output).to.equal(3);
            done();
        }).catch((e) => {
            console.log('array parsing error: ', e);
        });
    });

    it('should handle objects as test inputs', (done) => {
        req = httpMocks.createRequest({
            method: 'POST',
            url: '/api/exercises/4',
            params: {
                exercise: '4'
            },
            body: {
                answer: 'function (map) { return Object.keys(map).map(function(elem) { return map[elem]; }) }'
            }
        });

        res = httpMocks.createResponse();

        let parsedResponse;

        postExercise(req, res).then(() => {
            parsedResponse = JSON.parse(res._getData());
            expect(_.isEqual(parsedResponse[0].output, [1, 2, 3])).to.be.true;
            done();
        }).catch((e) => {
            console.log('object parsing error: ', e);
        });
    });


    describe('The returned json object', function () {
        var parsedResponse;

        it('should contain a "correct" boolean', function () {
            postExercise(req, res).then(() => {
                parsedResponse = JSON.parse(res._getData());
                expect(typeof parsedResponse[0].correct).to.equal('boolean');
                expect(parsedResponse[0].correct).to.equal(true);
                done();
            });
        });

        it('should contain the input text', function () {
            postExercise(req, res).then(() => {
                parsedResponse = JSON.parse(res._getData());
                expect(typeof parsedResponse[0].input).to.equal('string');
                expect(parsedResponse[0].input).to.equal('');
                done();
            });
        });

        it('should contain the output text', function () {
            postExercise(req, res).then(() => {
                parsedResponse = JSON.parse(res._getData());
                expect(typeof parsedResponse[0].output).to.equal('string');
                expect(parsedResponse[0].output).to.equal('Hello World!');
                done();
            });
        });
    });
});
