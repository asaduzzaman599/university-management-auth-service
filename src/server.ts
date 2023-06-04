import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'

main().catch(err => errorLogger.error(err))

async function main() {
  try {
    await mongoose.connect(config.DB_URI as string)
    // console.log('DB Connected Successfully')
    logger.info('DB Connected Successfully')

    app.listen(config.PORT, () => {
      logger.info(`App listening on port ${config.PORT}`)
    })
  } catch (err) {
    errorLogger.error(`ERROR: Failed to Connect DB : ${err}`)
  }

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
