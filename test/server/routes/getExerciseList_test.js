var httpMocks = require('node-mocks-http');
var expect = require('chai').expect;
var sinon = require('sinon');
var fs = require('fs');
var _ = require('lodash');

describe('getExercisesList', () => {
    var getExercisesList = require('../../../server/api/getExercisesList.js');
    var req;
    var res;

    beforeEach(() => {
        req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/exercises'
        });

        res = httpMocks.createResponse();
    });

    it('should return a list of exercises', () => {
        let parsedResponse;

        getExercisesList(req, res);

        parsedResponse = JSON.parse(res._getData());

        expect(_.isArray(parsedResponse)).to.equal(true);
    });

    describe('The returned list of exercises', () => {
        it('should contain a title', () => {
            let parsedResponse;

            getExercisesList(req, res);

            parsedResponse = JSON.parse(res._getData());

            expect(parsedResponse[0].title).to.be.defined;
            expect(typeof parsedResponse[0].title).to.equal('string');
        });

        it('should contain the exercise url', () => {
            let parsedResponse;

            getExercisesList(req, res);

            parsedResponse = JSON.parse(res._getData());

            expect(parsedResponse[0].url).to.be.defined;
            expect(typeof parsedResponse[0].url).to.equal('string');
        });
    })
});
