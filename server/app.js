'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const socket = require('socket.io');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const ddbUtils = require('./utils/ddb-utils');
const passwordUtils = require('./utils/password-utils');

const getExerciseList = require('./api/getExercisesList');
const getExercise = require('./api/getExercise');
const postExercise = require('./api/postExercise');
const postRegister = require('./api/postRegister');

let server;
let io;

passport.use(new LocalStrategy((username, password, done) => {
    console.log('trying to authenticate %s...', username);

    ddbUtils.getUser(username).then(user => {
        if (!user) {
            console.log('no user found.')
            return done(null, false, { message: 'Incorrect username.'});
        }

        passwordUtils.hash(password, user.salt).then(hash => {
            if (hash !== user.password) {
                console.log('password does not match.');
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        })
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user)
})

passport.deserializeUser(function(user, done) {
    done(null, user)
})

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public', express.static(path.resolve(__dirname, '../public')))

app.post('/sign-in', passport.authenticate('local'), (req, res) => {
    res.redirect('/user/' + req.user.username)
})

app.get('/api/is-username-available/:username', (req, res) => {
    ddbUtils.getUser(req.params.username).then(data => {
        if (!data) res.send(true);

        res.send(false);
    });
})

/* Attempts to register a user */
app.post('/register', postRegister);

/* Returns the list of exercises available. */
app.get('/api/exercises', getExerciseList);

/* Fetches data around the exercise, e.g. title, problem. */
app.get('/api/exercises/:exercise', getExercise);

app.post('/api/register', postRegister);

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
});

app.set('port', (process.env.PORT || 5000));

server = app.listen(app.get('port'), () => {
    let port = server.address().port;

    console.log(`[${new Date()}] jsgolf server running on port ${server.address().port}`);
});

io = socket(server);

io.on('connection', socket => {
    socket.on('disconnect', () => {
        console.log('socket ' + socket.id + ' has disconnected.');
        process.emit('socketDisconnected', socket);
    });

    socket.on('postExercise', data => {
        postExercise(socket, data);
    });
});

module.exports = server;
