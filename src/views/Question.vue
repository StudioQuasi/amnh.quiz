<template>
  <div>
    <h1>Question number {{ this.id }}</h1>
    <Timer></Timer>
    <Answer v-for="answer in answers" :key="answer.id" :answer="answer" />
  </div>
</template>

<script>
import Timer from "@/components/Timer.vue";
import Answer from "@/components/Answer.vue";
import QuizService from "@/services/QuizService.js";

export default {
  props: ["id"],
  components: {
    Answer,
    Timer // change to our component
  },
  data() {
    return {
      answers: []
    };
  },
  // When this is first created
  created() {
    QuizService.getQuestions()

      .then(response => {
        console.log("here");
        this.answers = response.data; //console.log(response.data)
      })
      .catch(error => {
        console.log("There was an error:", error.response);
      });
  }
};
</script>
