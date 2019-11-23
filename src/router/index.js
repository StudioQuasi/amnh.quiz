import Vue from 'vue'
import VueRouter from 'vue-router'

import Quiz from '../views/Quiz.vue'
import Waiting from '../views/Waiting.vue'
import VideoTest from '../views/VideoTest.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/waiting',
    name: 'waiting',
    component: Waiting,
    props: true
  },
  {
    path: '/quiz/:quizId',
    name: 'client-show',
    component: Quiz,
    props: true
  },
  {
    path: '/host/:quizId',
    name: 'host-show',
    component: Quiz,
    props: true
  },
  {
    path: '/assets/quizzes.json',
    name: 'quizzes'
  },
  {
    path: '/videotest',
    name: 'videotest-show',
    component: VideoTest
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
