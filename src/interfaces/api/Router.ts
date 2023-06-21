import IndexRouter from './routes';
import AuthRouter from './routes/auth';
import LocationRouter from './routes/location';

const Router = () => [
  new IndexRouter(),
  new AuthRouter(),
  new LocationRouter()
];

export default Router;
