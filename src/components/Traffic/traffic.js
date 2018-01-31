import Vue from 'vue';
import template from './traffic.html';
import {
  generateLights, generateGrid, toggleGame, moveCars,
  newCar, switchLight, Green,
} from './traffic-constants';

export default Vue.extend({
  template,

  data() {
    return {
      traffic: this.$store.state.traffic,
    }
  },
  created() {
    const routes = this.$store.getters.getRoutes;

    this.$store.commit(generateGrid, routes);
    this.$store.commit(generateLights);
  },
  methods: {
    isLight(location, row, col) {
      const { lights } = this.traffic;

      if (lights[`${row}-${col}`]) {
        return lights[`${row}-${col}`].location === location;
      }
      return false;
    },
    isGreen(row, col) {
      const { lights } = this.traffic;
      if (lights[`${row}-${col}`]) {
        return lights[`${row}-${col}`].status === Green;
      }
      return false;
    },
    switchLight(row, col) {
      const data = { row, col };
      this.$store.commit(switchLight, data);
    },
    toggleGame() {
      const actions = {
        newCar: () => this.$store.commit(newCar),
        moveCars: () => this.$store.commit(moveCars, this.toggleGame),
      };
      this.$store.commit(toggleGame, actions);
    },
  }
});
