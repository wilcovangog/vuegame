import {
  Red, Green, Car, Boom, Start,
  generateGrid, generateLights, toggleGame, moveCars,
  newCar, switchLight,
} from './traffic-constants';

const trafficActions = {
  [generateGrid]: (state, routes) => {
    const { traffic } = state;
    const grid = {};
    const crossings = [];

    for (const route in routes) {
      for (const step in routes[route]) {
        const spot = routes[route][step].split('-');
        if (!grid[spot[0]]) {
          grid[spot[0]] = {};
          for (let i = 1;i < 14; i++) {
            grid[spot[0]][i] = '';
          }
        }

        if (grid[spot[0]][spot[1]] === 'r') {
          grid[spot[0]][spot[1]] = 'c';
          crossings.push({ x: spot[0], y: spot[1] });
        } else {
          grid[spot[0]][spot[1]] = 'r';
        }
      }
    }

    traffic.routes = routes;
    traffic.crossings = crossings;
    traffic.grid = grid;
  },
  [generateLights]: state => {
    const { crossings } = state.traffic;
    const newLights = {};

    for (const c in crossings) {
      let intersection = { top: false, right: false, bottom: false, left: false };
      for (const cross in crossings) {
        if (parseInt(crossings[c].x) === parseInt(crossings[cross].x) + 1) {
          intersection.right = true;
        } else if (parseInt(crossings[c].x) === parseInt(crossings[cross].x) - 1) {
          intersection.left = true;
        } else if (parseInt(crossings[c].y) === parseInt(crossings[cross].y) + 1) {
          intersection.bottom = true;
        } else if (parseInt(crossings[c].y) === parseInt(crossings[cross].y) - 1) {
          intersection.top = true;
        }
      }
      if (intersection.left && intersection.top && !intersection.right && !intersection.bottom) {
        newLights[`${crossings[c].x}-${crossings[c].y}`] = {status: Red, location: 'top'};
      } else if (!intersection.left && !intersection.top && intersection.right && intersection.bottom) {
        newLights[`${crossings[c].x}-${crossings[c].y}`] = {status: Red, location: 'bottom'};
      } else if (intersection.left && !intersection.top && !intersection.right && intersection.bottom) {
        newLights[`${crossings[c].x}-${crossings[c].y}`] = {status: Red, location: 'right'};
      } else if (!intersection.left && intersection.top && intersection.right && !intersection.bottom) {
        newLights[`${crossings[c].x}-${crossings[c].y}`] = {status: Red, location: 'left'};
      }
    }
    state.traffic.lights = newLights;
  },
  [toggleGame]: (state, actions) => {
    const { moveTime, spawnTime } = state.traffic;
    if (state.traffic.moveTimer) {
      clearInterval(state.traffic.moveTimer);
      clearInterval(state.traffic.spawnTimer);
      state.traffic.moveTimer = false;
      state.traffic.spawnTimer = false;
      state.traffic.cars = [];
      state.traffic.spawned = 0;
    } else {
      state.traffic.carLocations = [];
      actions.newCar();
      state.traffic.moveTimer = setInterval(() => {
        actions.moveCars();
      }, moveTime);
      state.traffic.spawnTimer = setInterval(() => {
        actions.newCar();
      }, spawnTime);
    }
  },
  [moveCars]: (state, toggleGame) => {
    const { cars, grid, lights } = state.traffic;

    const newLocations = {};
    let stop = false;

    for (const c in cars) {
      const car = Object.assign({}, cars[c]);
      let moveCar = false;
      if (car.route && car.route.length !== 0) {
        cars[c] = { location: '', route: [] };

        const oldPlace = car.location.split('-');
        const newPlace = car.route[0].split('-');

        let carDirection = '';
        if (parseInt(oldPlace[0]) === parseInt(newPlace[0]) + 1) {
          carDirection = 'bottom';
        } else if (parseInt(oldPlace[0]) === parseInt(newPlace[0]) - 1) {
          carDirection = 'top';
        } else if (parseInt(oldPlace[1]) === parseInt(newPlace[1]) + 1) {
          carDirection = 'right';
        } else if (parseInt(oldPlace[1]) === parseInt(newPlace[1]) - 1) {
          carDirection = 'left';
        }
        if (grid[newPlace[0]][newPlace[1]] === 'r')
        {
          moveCar = true;
        } else if (
          grid[newPlace[0]][newPlace[1]] === 'c' &&
          lights[`${newPlace[0]}-${newPlace[1]}`] &&
          lights[`${newPlace[0]}-${newPlace[1]}`].status === Green)
        {
          moveCar = true;
        } else if (
          grid[newPlace[0]][newPlace[1]] === 'c' &&
          lights[`${newPlace[0]}-${newPlace[1]}`] &&
          lights[`${newPlace[0]}-${newPlace[1]}`].status === Red &&
          lights[`${newPlace[0]}-${newPlace[1]}`].location !== carDirection
        ) {
          moveCar = true;
        }

        if (moveCar) {
          if (!newLocations[newPlace[0]]) {
            cars[c].location = car.route[0];
            cars[c].route = car.route;
            cars[c].route.shift();
            newLocations[newPlace[0]] = { [newPlace[1]]: Car };
          } else if (newLocations[newPlace[0]][newPlace[1]] === Car && grid[newPlace[0]][newPlace[1]] === 'c') {
            newLocations[newPlace[0]][newPlace[1]] = Boom;
            stop = true;
          } else if (newLocations[newPlace[0]][newPlace[1]] === Car || newLocations[newPlace[0]][newPlace[1]] === Boom ) {
            if (oldPlace[0] !== Start) {
              cars[c].location = car.location;
              cars[c].route = car.route;
              if (!newLocations[oldPlace[0]]) {
                newLocations[oldPlace[0]] = { [oldPlace[1]]: Car };
              } else {
                newLocations[oldPlace[0]][oldPlace[1]] = Car;
              }
            } else {
              newLocations[newPlace[0]][newPlace[1]] = Boom;
              stop = true;
            }
          } else {
            cars[c].location = car.route[0];
            cars[c].route = car.route;
            cars[c].route.shift();
            newLocations[newPlace[0]][newPlace[1]] = Car;
          }
        } else {
          cars[c].location = car.location;
          cars[c].route = car.route;
          if (!newLocations[oldPlace[0]]) {
            newLocations[oldPlace[0]] = { [oldPlace[1]]: Car };
          } else {
            newLocations[oldPlace[0]][oldPlace[1]] = Car;
          }
        }
      }
    }

    state.traffic.carLocations = newLocations;

    if (stop) {
      toggleGame();
    }
  },
  [switchLight]: (state, data) => {
    const { row, col } = data;
    const newLights = Object.assign({}, state.traffic.lights);

    if (newLights[`${row}-${col}`]) {
      if (newLights[`${row}-${col}`].status === Red) {
        newLights[`${row}-${col}`].status = Green;
      } else {
        newLights[`${row}-${col}`].status = Red;
      }
    }
    state.traffic.lights = newLights;
  },
  [newCar]: (state) => {
    const { cars, routes, spawned } = state.traffic;
    const randomRoute = Math.floor(Math.random()*routes.length);

    state.traffic.spawned = spawned + 1;
    cars.push({ route: routes[randomRoute].slice(), location: Start });
  }
};

export default trafficActions;