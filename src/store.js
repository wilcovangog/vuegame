import Vue from 'vue';
import Vuex from 'vuex';

import apiRequests from './services/api-requests';
import trafficActions from './components/traffic/traffic-actions';
import puzzleActions from './components/puzzle/puzzle-actions';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    traffic: {
      title: 'Traffic Planner',
      grid: {},
      cars: [],
      carLocations: {},
      crossings: [],
      lights: {},
      routes: [],
      spawnTime: 2000,
      moveTime: 800,
      spawned: 0,
      moveTimer: false,
      spawnTimer: false,
    },
    puzzle: {
      title: 'Word Seeker',
      board: {},
      words: [],
      selection: {},
      solved: false,
    }
  },
  getters: Object.assign(
    {},
    apiRequests,
  ),
  mutations: Object.assign(
    {},
    trafficActions,
    puzzleActions,
  ),
});

export default store;