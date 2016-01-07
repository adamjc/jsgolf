'use strict';

const AWS = require('aws-sdk');
const table = 'users';

AWS.config.update({
  region: 'eu-west-1',
  endpoint: 'dynamodb.eu-west-1.amazonaws.com'
});

const docClient = new AWS.DynamoDB.DocumentClient();

/* Attempts to register a new user. */
function postRegister(req, res) {
    console.log('Attempting to register with', req.body);

    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    let params = {
        TableName: table,
        Item: {
            'username': username,
            'password': password,
            'email': email
        }
    };

    let promise = new Promise((resolve, reject) => {
        docClient.put(params, (err, data) => {
            if (err) {
                console.error('Unable to add item: ', JSON.stringify(err, null, 2));
                reject(err);
            }
            else {
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
}

module.exports = postRegister;
