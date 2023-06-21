import dotenv from 'dotenv';
import App from './interfaces/api/App';
import Logger from './infrastructure/logger';
import MongooseAdapter from './infrastructure/orm/mongoose';

dotenv.config();

const app = App.instance;

const mongoose = MongooseAdapter.instance;

/**
 * Start App
 *
 * @function
 */
const bootstrap = async () => {
  Logger.log(`Run Environment: ${process.env.NODE_ENV}`);
  Logger.log(`Launch Application: ${process.env.APP_NAME}\n`);

  try {
    await mongoose.run();

    app.start();
  } catch (error) {
    Logger.error(error.message, error.stack);
    process.exit(1);
  }
};

bootstrap();
