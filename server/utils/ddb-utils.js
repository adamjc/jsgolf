'use strict';

const AWS = require('aws-sdk');

AWS.config.update({
  region: 'eu-west-1',
  endpoint: 'dynamodb.eu-west-1.amazonaws.com'
});

const table = 'users';
const docClient = new AWS.DynamoDB.DocumentClient();

function getUser(username) {
    let query = {
        TableName : "users",
        KeyConditionExpression: "username = :username",
        ExpressionAttributeValues: { ":username": username }
    };

    return new Promise((resolve, reject) => {
        docClient.query(query, (err, data) => {
            if (err) {
                console.error('getUser error: %s', err);
                reject(err);
            }
            else {
                resolve(data.Items.pop());
            }
        });
    });
}

module.exports = {
    getUser
};
