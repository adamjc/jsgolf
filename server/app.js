'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const _ = require('lodash');
const path = require('path');
const events = require('events');
const socket = require('socket.io');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const getExerciseList = require('./api/getExercisesList');
const getExercise = require('./api/getExercise');
const postExercise = require('./api/postExercise');
const postRegister = require('./api/postRegister');

let server;
let io;

passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user => {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Incorrect username.' });
        if (!user.validPassword(password)) {
            return done (null, false, { message: 'Incorect password.' });
        }
        return done(null, user);
    }));
}))

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public', express.static(path.resolve(__dirname, '../public')));

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.redirect('/user/' + req.user.username);
})

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

    console.log('jsgolf up and running');
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
