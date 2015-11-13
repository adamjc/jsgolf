const httpMocks = require('node-mocks-http');
const expect = require('chai').expect;
const sinon = require('sinon');
const fs = require('fs');
const _ = require('lodash');

describe('getExercise', () => {
    const getExercise = require('../../../server/api/getExercise.js');

    let req;
    let res;

    beforeEach(() => {
        req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/exercises/1',
            params: {
                exercise: '1'
            }
        });

        res = httpMocks.createResponse();
    });

    it('should respond', () => {
        res.json = sinon.spy();

        getExercise(req, res);

        expect(res.json.called).to.equal(true);
    });

    it('should return the exercise requested', () => {
        let parsedResponse;

        getExercise(req, res);

        parsedResponse = JSON.parse(res._getData());

        expect(typeof parsedResponse).to.equal('object');
    });

    describe('The returned json object', () => {
        it('should contain a title', () => {
            const file = require('../../../server/exercises/exercise_1_hello-world');

            let parsedResponse;

            getExercise(req, res);

            parsedResponse = JSON.parse(res._getData());

            expect(parsedResponse.title).to.equal(file.title);
        });

        it('should contain some exercise text', () => {
            let file = require('../../../server/exercises/exercise_1_hello-world');
            let parsedResponse;

            getExercise(req, res);

            parsedResponse = JSON.parse(res._getData());

            expect(parsedResponse.description).to.equal(file.description);
        });
    })
});
