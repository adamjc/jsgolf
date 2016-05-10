'use strict'

const AWS = require('aws-sdk')
const ddbUtils = require('../utils/ddb-utils')
const passwordUtils = require('../utils/password-utils')

AWS.config.update({
  region: 'eu-west-1',
  endpoint: 'dynamodb.eu-west-1.amazonaws.com'
})

const table = 'users'
const docClient = new AWS.DynamoDB.DocumentClient()

/* Attempts to register a new user. */
function postRegister(req, res) {
    let username = req.body.username
    let password = req.body.password
    let email = req.body.email
    let salt = passwordUtils.salt()

    if (!username) {
        return res.status(422).send('No username was provided.')
    }

    if (!password) {
        return res.status(422).send('No password was provided.')
    }

    ddbUtils.getUser(username).then(data => {
        if (data && data.username) {
            console.log('user %s already exists', data.username)
            return res.status(422).send('Username already exists.')
        }

        passwordUtils.hash(password, salt).then(hash => {
            let params = {
                TableName: table,
                Item: {
                    'username': username,
                    'password': hash,
                    'salt': salt,
                    'email': email
                }
            }

            let promise = new Promise((resolve, reject) => {
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

            promise.then(data => {
                console.log('promise resolved: ', data)
                res.status(200).send()
            }).catch(error => {
                console.log('promise rejected: ', data)
                res.status(500).send()
            })
        })
    })
}

module.exports = postRegister
