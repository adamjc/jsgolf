const httpMocks = require('node-mocks-http');
const expect = require('chai').expect;
const sinon = require('sinon');
const fs = require('fs');
const _ = require('lodash');

describe('postExercise', () => {
    const postExercise = require('../../../server/api/postExercise.js');

    let req;
    let res;

    beforeEach(() => {
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

    it('should respond', done => {
        res.json = sinon.spy();

        postExercise(req, res).then(() => {
            expect(res.json.called).to.equal(true);
            done();
        });
    });

    it('should return the results of the exercise', done => {
        let parsedResponse;

        postExercise(req, res).then(() => {
            parsedResponse = JSON.parse(res._getData());
            expect(typeof parsedResponse).to.equal('object');
            done();
        });
    });

    it('should handle multiple parameters as test inputs', done => {
        let parsedResponse;

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

        postExercise(req, res).then(() => {
            parsedResponse = JSON.parse(res._getData());
            expect(parsedResponse[0].output).to.equal(2);
            done();
        }).catch((e) => {
            console.log('multiple parameters parsing error: ', e);
        });
    });

    it('should handle arrays as test inputs', done => {
        let parsedResponse;

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

        postExercise(req, res).then(() => {
            parsedResponse = JSON.parse(res._getData());
            expect(parsedResponse[0].output).to.equal(3);
            done();
        }).catch((e) => {
            console.log('array parsing error: ', e);
        });
    });

    it('should handle objects as test inputs', done => {
        let parsedResponse;

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

        postExercise(req, res).then(() => {
            parsedResponse = JSON.parse(res._getData());
            expect(_.isEqual(parsedResponse[0].output, [1, 2, 3])).to.be.true;
            done();
        }).catch((e) => {
            console.log('object parsing error: ', e);
        });
    });


    describe('The returned json object', () => {
        let parsedResponse;

        it('should contain a "correct" boolean', () => {
            postExercise(req, res).then(() => {
                parsedResponse = JSON.parse(res._getData());
                expect(typeof parsedResponse[0].correct).to.equal('boolean');
                expect(parsedResponse[0].correct).to.equal(true);
                done();
            });
        });

        it('should contain the input text', () => {
            postExercise(req, res).then(() => {
                parsedResponse = JSON.parse(res._getData());
                expect(typeof parsedResponse[0].input).to.equal('string');
                expect(parsedResponse[0].input).to.equal('');
                done();
            });
        });

        it('should contain the output text', () => {
            postExercise(req, res).then(() => {
                parsedResponse = JSON.parse(res._getData());
                expect(typeof parsedResponse[0].output).to.equal('string');
                expect(parsedResponse[0].output).to.equal('Hello World!');
                done();
            });
        });
    });
});
