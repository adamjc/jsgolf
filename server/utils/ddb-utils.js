const AWS = require('aws-sdk')
const exerciseUtils = require('./exercise-utils')
const logger = require('./logger')

AWS.config.update({
  region: 'eu-west-1',
  endpoint: 'dynamodb.eu-west-1.amazonaws.com'
})

const docClient = new AWS.DynamoDB.DocumentClient()

function addUser(username, hash, salt, email) {
  let params = {
    TableName: 'users',
    Item: {
      'username': username,
      'password': hash,
      'salt': salt,
      'email': email,
      'exercises': {}
    }
  }

  return new Promise((resolve, reject) => {
    docClient.put(params, (err, data) => {
      if (err) {
        logger.log('error', `Unable to add item: ${JSON.stringify(err, null, 2)}`)
        reject(err)
      } else {
        logger.log('info', `Added item: ${JSON.stringify(data, null, 2)}`)
        resolve(data)
      }
    })
  })
}

function updateHighscore(exercise, username, score) {
  exercise = exerciseUtils.getExerciseFilename(exercise).split('-').join('_')

  let query = {
    TableName : 'exercises',
    Key: {
      'exercise': exercise
    },
    UpdateExpression: 'set scores.#username = :score',
    ExpressionAttributeNames: {
      '#username': username
    },
    ExpressionAttributeValues: {
      ':score': score
    }
  }

  return new Promise((resolve, reject) => {
    docClient.update(query, (err, data) => {
      if (err) {
        logger.log('error', `updateHighscore error: ${err}`)
        reject(err)
      }
    })
  })
}

function updateExercise(username, exercise, answer) {
  let answerMap = {
    characters: answer.length,
    answer: answer
  }
  let ddbExercise = exerciseUtils.getExerciseFilename(exercise).split('-').join('_')
  let expression = `set exercises.${ddbExercise} = :answer`
  let query = {
    TableName : 'users',
    Key: {
      'username': username
    },
    UpdateExpression: expression,
    ExpressionAttributeValues: {
      ':answer': answerMap
    },
  }

  return new Promise((resolve, reject) => {
    docClient.update(query, (err, data) => {
      if (err) {
        logger.log('error', `getUser error: ${err}`)
        reject(err)
      } else {
        logger.log('info', `UpdateItem succeeded: ${JSON.stringify(data, null, 2)}`)
      }
    })
  })
}

function getExercise(exercise) {
  let query = {
    TableName : 'exercises',
    KeyConditionExpression: 'exercise = :exercise',
    ExpressionAttributeValues: { ':exercise': dDBifyExercise(exercise) }
  }

  return new Promise((resolve, reject) => {
    docClient.query(query, (err, data) => {
      if (err) {
        logger.log('error', `getExercise error: ${err}`)
        reject(err)
      } else {
        resolve(data.Items.pop())
      }
    })
  })
}

function getUser(username) {
  let query = {
    TableName : 'users',
    KeyConditionExpression: 'username = :username',
    ExpressionAttributeValues: { ':username': username }
  }

  return new Promise((resolve, reject) => {
    docClient.query(query, (err, data) => {
      if (err) {
        logger.log('error', `getUser error: ${err}`)
        reject(err)
      } else {
        resolve(data.Items.pop())
      }
    })
  })
}

function dDBifyExercise(string) {
  return string.toLowerCase().split(/-| /).join('_')
}

module.exports = {
  getUser,
  addUser,
  updateExercise,
  updateHighscore,
  getExercise
}
