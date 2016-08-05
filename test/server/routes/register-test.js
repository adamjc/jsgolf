const expect = require('chai').expect;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const _ = require('lodash');
const postRegister = require('../../../server/api/register.js');
const path = require('path');

describe('postRegister', () => {
    let req;
    let res;

    beforeEach(() => {
        res = httpMocks.createResponse();
    });

    it('should return a response of 422 when a username is not present in the request', () => {
        req = httpMocks.createRequest({
            method: 'POST',
            url: '/api/post-register',
            body: {
                username: '',
                password: 'password',
                email: 'email@email.com'
            }
        });

        res.json = sinon.spy();

        postRegister(req, res);
        expect(res.statusCode).to.equal(422);
    });

    it('should return a response of 422 when a password is not present in the request', () => {
        req = httpMocks.createRequest({
            method: 'POST',
            url: '/api/post-register',
            body: {
                username: 'username',
                password: '',
                email: 'email@email.com'
            }
        });

        res.json = sinon.spy();

        postRegister(req, res);
        expect(res.statusCode).to.equal(422);
    });
});
