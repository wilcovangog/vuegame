import {
  generateBoard, selectLetter, wordFound,
} from './puzzle-constants';

const puzzleActions = {
  [generateBoard]: (state, puzzle) => {
    state.puzzle.board = puzzle.board;
    state.puzzle.words = puzzle.words;

    const selection = {};
    for (let height = 1; height <= puzzle.board.height; height += 1) {
      selection[height] = {};
      for (let width = 1; width <= puzzle.board.width; width += 1) {
        selection[height][width] = { selected: false, solved: false };
      }
    }
    state.puzzle.selection = selection;
    state.puzzle.solved = false;
  },
  [selectLetter]: (state, location) => {
    const { row, col } = location;
    state.puzzle.selection[row][col].selected = !state.puzzle.selection[row][col].selected;
  },
  [wordFound]: (state) => {
    const { words, selection } = state.puzzle;
    const newWords = Object.assign({}, words);
    let selected = '';
    for (const row in selection) {
      for (const col in selection[row]) {
        if (selection[row][col].selected) {
          let newLetter;
          newLetter = row < 10 ? `0${row}` : row;
          newLetter += col < 10 ? `0${col}` : col;

          selected += newLetter;
        }
      }
    }

    for (const w in newWords) {
      if (newWords[w].location === selected) {
        newWords[w].found = true;

        const newSelection = Object.assign({}, selection);
        for (const row in selection) {
          for (const col in selection[row]) {
            if (selection[row][col].selected) {
              newSelection[row][col].selected = false;
              newSelection[row][col].solved = true;
            }
          }
        }

        state.puzzle.selection = newSelection;

        let foundAll = true;
        for (const w in newWords) {
          if (!newWords[w].found) {
            foundAll = false;
          }
        }
        if (foundAll) {
          state.puzzle.solved = true;
        }
      }
    }

    state.puzzle.words = newWords;
  }
};

export default puzzleActions;