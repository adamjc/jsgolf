var requestPromise = require('request-promise');

var mockData = [
    {
        id: 0,
        text: 'hello1'
    },
    {
        id: 1,
        text: 'hello2'
    },
    {
        id: 2,
        text: 'hello3'
    },
    {
        id: 3,
        text: 'hello4'
    },
    {
        id: 4,
        text: 'hello5'
    },
];

var resultsFetcher = {
    fetch: function () {
        return requestPromise('http://localhost:3000/test').then((result) => {
            console.log(result);

            resolve(result);
        });
        // return new Promise(function (resolve, reject) {
        //     setTimeout(function () {
        //         resolve(mockData);
        //     }, 250);
        // });
    }
};

module.exports = resultsFetcher;
