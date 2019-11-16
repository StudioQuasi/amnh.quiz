import Vue from "vue";
import VueRouter from "vue-router";

import Question from "../views/Question.vue";
import Waiting from "../views/Waiting.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/waiting",
    name: "waiting",
    component: Waiting,
    props: true
  },
  {
    path: "/question/:id",
    name: "question-show",
    component: Question,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
