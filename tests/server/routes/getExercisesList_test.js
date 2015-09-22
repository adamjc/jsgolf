var httpMocks = require('node-mocks-http');
var expect = require('chai').expect;
var sinon = require('sinon');
var fs = require('fs');
var _ = require('lodash');

describe('getExercisesList', function () {
    var getExercisesList = require('../../../api/getExercisesList.js');
    var req;
    var res;

    beforeEach(function () {
        req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/exercises'
        });

        res = httpMocks.createResponse();
    });

    it('should respond', function () {
        res.json = sinon.spy();

        getExercisesList(req, res);

        expect(res.json.called).to.equal(true);
    });

    it('should return a list of all the exercises available', function () {
        var files = fs.readdirSync('./exercises');
        var parsedResponse;

        getExercisesList(req, res);

        parsedResponse = JSON.parse(res._getData());

        expect(_.isArray(parsedResponse)).to.equal(true);
        expect(parsedResponse.length).to.equal(files.length);
    });

    describe('The returned json objects', function () {
        it('should contain a title', function () {
            var parsedResponse;

            getExercisesList(req, res);

            parsedResponse = JSON.parse(res._getData());

            expect(parsedResponse[0].title).to.be.defined;
            expect(typeof parsedResponse[0].title).to.equal('string');
        });

        it('should contain the exercise url', function () {
            var parsedResponse;

            getExercisesList(req, res);

            parsedResponse = JSON.parse(res._getData());

            expect(parsedResponse[0].url).to.be.defined;
            expect(typeof parsedResponse[0].url).to.equal('string');
        });
    })
});
