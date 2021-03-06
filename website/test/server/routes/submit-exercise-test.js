const httpMocks = require('node-mocks-http')
const expect = require('chai').expect
const sinon = require('sinon')
const fs = require('fs')
const _ = require('lodash')
const AWS = require('aws-sdk-mock')
const app = require('../../../app.js')
const request = require('request-promise')
const R = require('ramda')

after(() => {
  app.close()
})

describe('postExercise', () => {
  let req
  let res
  let getExercisePromise

  const postExercise = require('../../../api/submit-exercise')

  beforeEach(() => {
    req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/exercises/hello-world',
      params: {
        exercise: 'hello-world'
      }
    })

    res = httpMocks.createResponse()
  })

  it('should respond', () => {
    res.json = sinon.spy()

    postExercisePromise = Promise.resolve(postExercise(req,res))

    postExercisePromise.then(data => {
      expect(res.statusMessage).to.equal("OK")
    })
  })

  it('can handle arrays', (done) => {
    let input = require('../canned_data/post_exercise/input/arrays')

    let requestOptions = {
      uri: 'http://localhost:1337/api/exercises/babbys-first-reduce',
      method: 'POST',
      body: input,
      json: true
    }

    request(requestOptions).then(results => {
      results.forEach(result => expect(result.output).to.equal(result.expectedOutput))
      done()
    }).catch(reason => console.log(reason))
  })

  it('can handle multiple parameters', (done) => {
    let input = require('../canned_data/post_exercise/input/multiple-params')

    let requestOptions = {
      uri: 'http://localhost:1337/api/exercises/multiple-parameters',
      method: 'POST',
      body: input,
      json: true
    }

    request(requestOptions).then(results => {
      results.forEach(result => expect(result.output).to.equal(result.expectedOutput))
      done()
    }).catch(reason => console.log(reason))
  })

  it('can handle objects as parameters', (done) => {
    let input = require('../canned_data/post_exercise/input/map')

    let requestOptions = {
      uri: 'http://localhost:1337/api/exercises/babbys-first-map',
      method: 'POST',
      body: input,
      json: true
    }

    request(requestOptions).then(results => {
      results.forEach(result => expect(R.head(result.output)).to.equal(R.head(result.expectedOutput)))
      done()
    }).catch(reason => console.log(reason))
  });
})
