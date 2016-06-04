'use strict'

const AWS = require('aws-sdk')
const exerciseUtils = require('./exercise-utils')

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
                console.error('Unable to add item: ', JSON.stringify(err, null, 2))
                reject(err)
            } else {
                console.log('Added item: ', JSON.stringify(data, null, 2))
                resolve(data)
            }
        })
    })
}

function updateExercises(exercise, characters, value) {
    let ddbExercise = exerciseUtils.getExerciseFilename(exercise).split('-').join('_')
    let query = {
        TableName : 'exercises',
        Key: {
            'exercise': ddbExercise
        },
        UpdateExpression: 'add chars.#characters :val',
        ExpressionAttributeNames: {
            '#characters': characters.toString()
        },
        ExpressionAttributeValues: {
            ':val': value
        }
    }

    return new Promise((resolve, reject) => {
        docClient.update(query, (err, data) => {
            if (err) {
                console.error('getExercises error: %s', err)
                reject(err)
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2))
            }
        })
    })
}

function updateExercise(username, exercise, characters) {
    let ddbExercise = exerciseUtils.getExerciseFilename(exercise).split('-').join('_')
    let expression = `set exercises.${ddbExercise} = :c`
    let query = {
        TableName : 'users',
        Key: {
            'username': username
        },
        UpdateExpression: expression,
        ExpressionAttributeValues: {
            ':c': characters
        },
    }

    return new Promise((resolve, reject) => {
        docClient.update(query, (err, data) => {
            if (err) {
                console.error('getUser error: %s', err)
                reject(err)
            } else {
                console.log("UpdateItem succeeded:", JSON.stringify(data, null, 2))
            }
        })
    })
}

function getExercise(exercise) {
    console.log('getting exercise:', dDBifyExercise(exercise))
    let query = {
        TableName : 'exercises',
        KeyConditionExpression: 'exercise = :exercise',
        ExpressionAttributeValues: { ':exercise': dDBifyExercise(exercise) }
    }

    return new Promise((resolve, reject) => {
        docClient.query(query, (err, data) => {
            if (err) {
                console.error('getExercise error: %s', err)
                reject(err)
            }
            else {
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
                console.error('getUser error: %s', err)
                reject(err)
            }
            else {
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
    updateExercises,
    getExercise
}
