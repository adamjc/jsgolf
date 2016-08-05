const httpMocks = require('node-mocks-http')
const expect = require('chai').expect
const sinon = require('sinon')
const fs = require('fs')
const _ = require('lodash')
const AWS = require('aws-sdk-mock')
const app = require('../../../server/app.js')
const request = require('request-promise')
const R = require('ramda')

after(() => {
  app.close()
})

describe('postExercise', () => {
  let req
  let res
  let getExercisePromise

  const postExercise = require('../../../server/api/submit-exercise')

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

    getExercisePromise = new Promise((resolve, reject) => {
      resolve(postExercise(req, res))
    })

    getExercisePromise.then(data => {
      expect(res.json.called).to.equal(true)
    })
  })

  it('can handle arrays', (done) => {
    let input = require('../canned_data/post_exercise/input/arrays')
    let output = require('../canned_data/post_exercise/expected_output/arrays')

    let requestOptions = {
      uri: 'http://localhost:5000/api/exercises/sum',
      method: 'POST',
      body: input,
      json: true
    }

    request(requestOptions).then(data => {
      expect(R.equals(data, output)).to.equal(true)
      done()
    }).catch(reason => console.log(reason))
  })

  it('can handle multiple parameters', (done) => {
    let input = require('../canned_data/post_exercise/input/multiple-params')
    let output = require('../canned_data/post_exercise/expected_output/multiple-params')

    let requestOptions = {
      uri: 'http://localhost:5000/api/exercises/multiple-parameters',
      method: 'POST',
      body: input,
      json: true
    }

    request(requestOptions).then(data => {
      expect(R.equals(data, output)).to.equal(true)
      done()
    }).catch(reason => console.log(reason))
  })

  it('can handle objects as parameters', (done) => {
    let input = require('../canned_data/post_exercise/input/map')
    let output = require('../canned_data/post_exercise/expected_output/map')

    let requestOptions = {
      uri: 'http://localhost:5000/api/exercises/map',
      method: 'POST',
      body: input,
      json: true
    }

    request(requestOptions).then(data => {
      expect(R.equals(data, output)).to.equal(true)
      done()
    }).catch(reason => console.log(reason))
  });
})
