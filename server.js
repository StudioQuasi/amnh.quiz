// ./server.js
/*
 * Initialise Express
 */
const express = require('express')
const path = require('path')
const app = express()
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

var quizState = STATE_STOP

var objState = {
  state: STATE_STOP,
  timer: 0,
  quizID: 0,
  questionID: 0
}

//Set Interval
var stateInterval

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
 * Define post route for creating new reviews
 */

app.get('/stop', (req, res) => {
  if (state == STATE_STOP) {
    state = STATE_WAIT
    setInterval(emitTimer, 200)
  }
  res.status(200).send()
})

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
