const httpMocks = require('node-mocks-http')
const expect = require('chai').expect
const sinon = require('sinon')
const fs = require('fs')
const _ = require('lodash')
const AWS = require('aws-sdk-mock')

describe('getExercise', () => {
    AWS.mock('DynamoDB.DocumentClient', 'query', function (params, callback) {
        callback(null, { Items: ['anything'] })
    })

    const getExercise = require('../../../server/api/getExercise.js')

    let req
    let res
    let getExercisePromise

    beforeEach(() => {
        req = httpMocks.createRequest({
            method: 'GET',
            url: '/api/exercises/hello-world',
            params: {
                exercise: 'hello-world'
            }
        })

        res = httpMocks.createResponse()

        getExercisePromise = new Promise(function (resolve, reject) {
            resolve(getExercise(req, res))
        })
    })

    it('should respond', () => {
        res.json = sinon.spy()

        getExercisePromise.then(() => {
            expect(res.json.called).to.equal(true)
        })
    })

    it('should return the exercise requested', () => {
        let parsedResponse

        getExercisePromise.then(() => {
            parsedResponse = JSON.parse(res._getData())

            expect(typeof parsedResponse).to.equal('object')
        })
    })

    describe('The returned json object', () => {
        it('should contain a title', () => {
            const file = require('../../../server/exercises/hello-world')

            let parsedResponse

            getExercise(req, res)

            parsedResponse = JSON.parse(res._getData())

            expect(parsedResponse.title).to.equal(file.title)
        })

        it('should contain some exercise text', () => {
            let file = require('../../../server/exercises/hello-world')
            let parsedResponse

            getExercise(req, res)

            parsedResponse = JSON.parse(res._getData())

            expect(parsedResponse.description).to.equal(file.description)
        })
    })
})
