const expect = require('chai').expect;
const sinon = require('sinon');
const fs = require('fs');
const _ = require('lodash');
const app = require('../../../server/app.js');
const io = require('socket.io-client')
const path = require('path');
const cannedDataLocation = '../canned_data/post_exercise/';

describe('postExercise', () => {
    const postExercise = require('../../../server/api/postExercise.js');
    const socketUrl = 'http://localhost:5000'

    let client;

    before(() => {
        client = io.connect(socketUrl);
    });

    after(() => {
        client.disconnect();
        app.close();
    })

    it('should handle multiple parameters as test inputs', done => {
        let data = require(path.join(cannedDataLocation, 'input/multiple-params.js'));
        let expectedOutput = require(path.join(cannedDataLocation, 'expected_output/multiple-params.js'));

        client.emit('postExercise', data);

        client.once('postedExercise', data => {
            expect(JSON.stringify(data)).to.equal(JSON.stringify(expectedOutput));
            done();
        });
    });

    it('should handle arrays as test inputs', done => {
        let data = require(path.join(cannedDataLocation, 'input/arrays.js'));
        let expectedOutput = require(path.join(cannedDataLocation, 'expected_output/arrays.js'));

        client.emit('postExercise', data);

        client.once('postedExercise', data => {
            expect(JSON.stringify(data)).to.equal(JSON.stringify(expectedOutput));
            done();
        });
    });

    it('should handle objects as test inputs', done => {
        let data = require(path.join(cannedDataLocation, 'input/objects.js'));
        let expectedOutput = require(path.join(cannedDataLocation, 'expected_output/objects.js'));

        client.emit('postExercise', data);

        client.once('postedExercise', data => {
            expect(JSON.stringify(data)).to.equal(JSON.stringify(expectedOutput));
            done();
        });
    });
});
