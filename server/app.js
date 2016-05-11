'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const socket = require('socket.io')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: 'secret'
}

const ddbUtils = require('./utils/ddb-utils')
const passwordUtils = require('./utils/password-utils')

const getExerciseList = require('./api/getExercisesList')
const getExercise = require('./api/getExercise')
const postExercise = require('./api/postExercise')
const postRegister = require('./api/postRegister')

const requireAuth = passport.authenticate('jwt', { session: false })
const jwt = require('jsonwebtoken')

let server
let io

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    ddbUtils.getUser(jwtPayload.username).then(user => {
        if (!user) {
            console.log('no user found.')
            return done(null, false, { message: 'Incorrect username.'})
        }

        return done(null, user)
    })
}))

app.use(passport.initialize())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public', express.static(path.resolve(__dirname, '../public')))

app.post('/api/sign-in', (req, res) => {
    console.log(`attempting to log in user ${req}`)
    ddbUtils.getUser(req.body.username).then(user => {
        if (!user) {
            console.log('no user found.')
            res.status(401).send('Incorrect username')
        }

        passwordUtils.hash(req.body.password, user.salt).then(hash => {
            if (hash !== user.password) {
                console.log('password does not match.')
                res.status(401).send('Incorrect password')
            }

            let token = jwt.sign(user, jwtOptions.secretOrKey, {
              expiresIn: 10080
            })

            res.status(200).send({ success: true, token: `JWT ${token}` })
        })
    })
})

app.get('/api/is-username-available/:username', (req, res) => {
    ddbUtils.getUser(req.params.username).then(data => {
        if (!data) res.send(true)

        res.send(false)
    })
})

/* Returns the list of exercises available. */
app.get('/api/exercises', getExerciseList)

/* Fetches data around the exercise, e.g. title, problem. */
app.get('/api/exercises/:exercise', getExercise)

/* Attempts to register a user */
app.post('/api/register', postRegister)

app.get('/api/test-auth', requireAuth, (req, res) => {
    res.status(200).send('authentication success!')
})

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'))
})

app.set('port', (process.env.PORT || 5000))

server = app.listen(app.get('port'), () => {
    console.log(`[${new Date()}] jsgolf server running on port ${server.address().port}`)
})

io = socket(server)

io.on('connection', socket => {
    socket.on('disconnect', () => {
        console.log('socket ' + socket.id + ' has disconnected.')
        process.emit('socketDisconnected', socket)
    })

    socket.on('postExercise', data => {
        postExercise(socket, data)
    })
})

module.exports = server
