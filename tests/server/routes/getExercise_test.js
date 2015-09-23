var httpMocks = require('node-mocks-http');
var expect = require('chai').expect;
var sinon = require('sinon');
var fs = require('fs');
var _ = require('lodash');

describe('getExercise', function () {
    var getExercise = require('../../../api/getExercise.js');
    var req;
    var res;

    beforeEach(function () {
        req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/exercises/1',
            params: {
                exercise: '1'
            }
        });

        res = httpMocks.createResponse();
    });

    it('should respond', function () {
        res.json = sinon.spy();

        getExercise(req, res);

        expect(res.json.called).to.equal(true);
    });

    it('should return the exercise requested', function () {
        var parsedResponse;

        getExercise(req, res);

        parsedResponse = JSON.parse(res._getData());

        expect(typeof parsedResponse).to.equal('object');
    });

    describe('The returned json object', function () {
        it('should contain a title', function () {
            var file = require('../../../exercises/exercise_1_hello-world');
            var parsedResponse;

            getExercise(req, res);

            parsedResponse = JSON.parse(res._getData());

            expect(parsedResponse.title).to.equal(file.title);
        });

        it('should contain some exercise text', function () {
            var file = require('../../../exercises/exercise_1_hello-world');

            var parsedResponse;

            getExercise(req, res);

            parsedResponse = JSON.parse(res._getData());

            expect(parsedResponse.description).to.equal(file.description);
        });
    })
});
