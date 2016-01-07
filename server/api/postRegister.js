'use strict';

const AWS = require('aws-sdk');
const table = 'users';
const crypto = require('crypto');

AWS.config.update({
  region: 'eu-west-1',
  endpoint: 'dynamodb.eu-west-1.amazonaws.com'
});

const docClient = new AWS.DynamoDB.DocumentClient();

/* Attempts to register a new user. */
function postRegister(req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    let salt = crypto.randomBytes(256);

    hash(password, salt).then(hash => {
        let params = {
            TableName: table,
            Item: {
                'username': username,
                'password': hash,
                'salt': salt,
                'email': email
            }
        };

        let promise = new Promise((resolve, reject) => {
            docClient.put(params, (err, data) => {
                if (err) {
                    console.error('Unable to add item: ', JSON.stringify(err, null, 2));
                    reject(err);
                } else {
                    console.log('Added item: ', JSON.stringify(data, null, 2));
                    resolve(data);
                }
            });
        });

        promise.then(data => {
            console.log('promise resolved: ', data);
            res.status(200).send();
        }).catch(error => {
            console.log('promise rejected: ', data);
            res.status(500).send();
        });
    });
}

/* Returns a promise that will resolve to a hash */
function hash(password, salt) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(password, salt, 100000, 256, 'sha256', (err, key) => {
            if (err) console.error('Error Hashing', err);
            resolve(key.toString('hex'));
        });
    });
}

module.exports = postRegister;
