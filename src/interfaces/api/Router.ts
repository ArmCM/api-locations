import AuthRouter from './routes/auth';
import IndexRouter from './routes';
import LocationRouter from './routes/location';
import UserRouter from './routes/user';

const Router = () => [new IndexRouter(), new UserRouter(), new AuthRouter(), new LocationRouter()];

export default Router;
