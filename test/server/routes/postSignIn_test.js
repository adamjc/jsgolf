const expect = require('chai').expect;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const _ = require('lodash');
const postSignIn = require('../../../server/api/postSignIn.js');
const path = require('path');

describe('postSignIn', () => {
    let req;
    let res;

    beforeEach(() => {
        res = httpMocks.createResponse();
    });

    it('should return a response of 422 when a username is not present in the request', () => {
        req = httpMocks.createRequest({
            method: 'POST',
            url: '/api/post-sign-in',
            body: {
                username: '',
                password: 'password'
            }
        });

        res.json = sinon.spy();

        postSignIn(req, res);
        expect(res.statusCode).to.equal(422);
    });

    it('should return a response of 422 when a password is not present in the request', () => {
        req = httpMocks.createRequest({
            method: 'POST',
            url: '/api/post-sign-in',
            body: {
                username: 'username',
                password: ''
            }
        });

        res.json = sinon.spy();

        postSignIn(req, res);
        expect(res.statusCode).to.equal(422);
    });
});
