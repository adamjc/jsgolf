var httpMocks = require('node-mocks-http');
var expect = require('chai').expect;
var sinon = require('sinon');
var fs = require('fs');
var _ = require('lodash');
var Q = require('Q');

describe('postExercise', function () {
    var postExercise = require('../../../api/postExercise.js');
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
                userFunction: 'function () { return "Hello World!"; }'
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
