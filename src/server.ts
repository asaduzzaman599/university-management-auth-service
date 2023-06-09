import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';
import { errorLogger, logger } from './shared/logger';

process.on('uncaughtException', err => {
  // eslint-disable-next-line no-console
  console.log('unhandledCaught Exception Detected.');
  process.exit(1);
});

/* main().catch(err => errorLogger.error(err)) */

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.DB_URI as string);
    // console.log('DB Connected Successfully')
    logger.info('DB Connected Successfully');

    server = app.listen(config.PORT, () => {
      logger.info(`App listening on port ${config.PORT}`);
    });
  } catch (err) {
    errorLogger.error(`ERROR: Failed to Connect DB : ${err}`);
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled

  process.on('unhandledRejection', err => {
    if (server) {
      // eslint-disable-next-line no-console
      console.log('Outside');
      server.close(() => {
        errorLogger.error(err);
        // eslint-disable-next-line no-console
        console.log(
          'unhandledRejection Detected. We are Closing our server...... :('
        );
        process.exit(1);
      });
    } else process.exit(1);
  });
}

main();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received!');
  if (server) {
    server.close(() => {
      // eslint-disable-next-line no-console
      console.log(
        'SIGTERM Signal Termination Detected. We are Closing our server...... :('
      );
    });
  }
});
// console.log(x)
