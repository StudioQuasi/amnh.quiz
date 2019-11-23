// ./server.js
/*
 * Initialise Express
 */
const express = require('express')
const path = require('path')
const app = express()
const randtoken = require('rand-token').suid

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname)))

/*
 * CONSTANTS
 */
const STATE_STOP = 0
const STATE_WAIT = 1
const STATE_QUIZ = 2

const API_QUIZ = '/'

//Define the State Object
var objState = {
  state: STATE_STOP,
  timer: 0,
  quizID: 0,
  questionID: 0
}

//Quiz Question
var objQuizAnswer = {
  userID: 0,
  quizID: 0,
  questionID: 0,
  questionAnswer: 0
}

//Define User Object
var objUser = {
  screenID: 0,
  id: 0,
  arrQuizAnswer: [],
  active: true
}

//Array of Users
var arrUsers = []

//Set Interval
var stateInterval

//Screen Index
var screenIndex = 0

/*
 * Initialise Pusher
 */
const Pusher = require('pusher')
const pusher = new Pusher({
  appId: '890360',
  key: '09cb2f14bc833f79ca68',
  secret: 'a02363ce10b77c4d1fab',
  cluster: 'us2'
})

/*
 * Client API
 */
app.get('/start', (req, res) => {
  var _token = randtoken(12)
  screenIndex++

  //Define User Object
  var objUser = {
    screenID: screenIndex,
    id: _token,
    arrQuizAnswer: [],
    active: true
  }

  //Add user
  arrUsers.push(objUser)

  res.json(objUser)
})

/*
 * Define post route for creating new reviews
 */

app.get('/stop', (req, res) => {
  objState.state = STATE_STOP
  clearInterval(stateInterval)
})

app.get('/quiz/:quizID/:delay', (req, res) => {
  objState.state = STATE_WAIT
  objState.setInterval(emitTimer, 1000)
  res.status(200).send()
})

app.get('/answer', (req, res) => {
  res.status(200).send()
})

/*
function emitState() {
  var _s = {
    state: 0,
    timer: 123
  }

  console.log('State : ' + _s)
  pusher.trigger('quizserver', 'state', _s)
}*/

function emitTimer() {
  var _out = {
    state: 0,
    timer: 123
  }

  console.log('out' + _out)
  pusher.trigger('quizserver', 'next', _out)
}

/*
 * Run app
 */
const port = 5000
app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
})
