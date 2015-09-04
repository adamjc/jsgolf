var requestPromise = require('request-promise');

var resultsFetcher = {
    fetch: function () {
        return requestPromise('http://localhost:3000/test');
    }
};

module.exports = resultsFetcher;
