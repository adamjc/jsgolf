'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const ddbUtils = require('./utils/ddb-utils')
const passwordUtils = require('./utils/password-utils')

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: passwordUtils.getSecret()
}

const getExerciseList = require('./api/get-exercises-list')
const getExercise = require('./api/get-exercise')
const postExercise = require('./api/submit-exercise')
const postRegister = require('./api/register')
const signIn = require('./api/sign-in')
const isUsernameAvailable = require('./api/is-username-available')

const requireAuth = passport.authenticate('jwt', { session: false })
const jwt = require('jsonwebtoken')

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

app.get('/api/is-username-available/:username', isUsernameAvailable)
app.get('/api/exercises', getExerciseList) /* Returns the list of exercises. */
app.get('/api/exercises/:exercise', getExercise) /* Fetches exercise data */
app.post('/api/exercises/:exercise', postExercise) /* Tests user code  */
app.post('/api/register', postRegister) /* Attempts to register a user */
app.post('/api/sign-in', signIn) /* Attempts to sign a user in */

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'))
})

app.set('port', (process.env.PORT || 5000))

let server = app.listen(app.get('port'), () => {
    console.log(`[${new Date()}] jsgolf server running on port ${server.address().port}`)
})

module.exports = server
