'use strict'

const AWS = require('aws-sdk')

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
            'email': email
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

function updateExercise(username, exercise, characters) {
    let ddbExercise = exercise.split('-').join('_')
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

module.exports = {
    getUser,
    addUser,
    updateExercise
}
