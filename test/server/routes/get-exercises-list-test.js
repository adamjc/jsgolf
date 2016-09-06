const httpMocks = require('node-mocks-http');
const expect = require('chai').expect;
const sinon = require('sinon');
const fs = require('fs');
const _ = require('lodash');

describe('getExercisesList', () => {
    const getExercisesList = require('../../../server/api/get-exercises-list.js');

    let req;
    let res;

    beforeEach(() => {
        req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/exercises',
            headers: {
              authorization: 'null'
            }
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
