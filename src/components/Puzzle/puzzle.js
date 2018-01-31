import Vue from 'vue';
import template from './puzzle.html';
import {
  generateBoard, selectLetter, wordFound,
} from './puzzle-constants';

export default Vue.extend({
  template,

  data() {
    return {
      puzzle: this.$store.state.puzzle,
    }
  },
  created() {
    const puzzle = this.$store.getters.getPuzzle;
    this.$store.commit(generateBoard, puzzle);
  },
  methods: {
    selectLetter(row, col) {
      const location = { row, col };
      this.$store.commit(selectLetter, location);
      this.$store.commit(wordFound);
    },
    letterState(row, col, state) {
      const { selection } = this.puzzle;

      if (selection[row] && selection[row][col]) {
        return selection[row][col][state];
      }
      return false;
    },
  }
});
