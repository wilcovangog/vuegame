import Home from 'components/Home/home';
import Traffic from 'components/Traffic/traffic';
import Puzzle from 'components/Puzzle/puzzle';
import NotFound from 'components/NotFound/notFound';

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/traffic',
    component: Traffic
  },
  {
    path: '/puzzle',
    component: Puzzle
  },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;
