import axios from 'axios'

const postURL = 'http://localhost:5000'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/./quizzes.json',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const apiCreateUser = axios.create({
  baseURL: postURL + '/start', //'http://localhost:8080/./quizzes.json',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getQuestions() {
    //axios.get('./quizzes.json') // Call out to this URL
    /*
      .then(response => {
        //this.userID = response.data.id
        //this.userScreenName = response.data.screenID
        // When the response returns, log it to the console
      })
      .catch(error => {
        console.log(error) // If an error is returned log it to the console
      })
      */
    return apiClient.get()
  },
  createUser() {
    /*
    axios
      .get(postURL + '/start') // Call out to this URL
      .then(response => {
        this.userID = response.data.id
        this.userScreenName = response.data.screenID
        // When the response returns, log it to the console
      })
      .catch(error => {
        console.log(error) // If an error is returned log it to the console
      })*/

    return apiCreateUser.get()
  },
  submitQuestion(_answerID, _userID, _quizID, _objQuestion) {
    console.log('>>> Submit Question')

    axios
      .get(
        postURL + '/answer',
        {
          userID: _userID,
          quizID: _quizID,
          questionID: _objQuestion.id,
          answerID: _answerID
        },
        {
          withCredentials: false,

          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'access-Control-Allow-Origin': true
          }
        }
      )
      .then(response => {
        console.log('SUBMIT QUESTION')
        console.log(response.data)
      })
      .catch(function(error) {
        //Reset the question if this fails
        console.log(error)
      })
  }
}
