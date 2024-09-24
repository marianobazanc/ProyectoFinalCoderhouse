
import { connect } from 'mongoose';
import { configObject } from './config.js';
import { logger } from '../utils/logger.js'

export const connectDB = () => {
    connect(configObject.MONGO_URL);
    logger.info('Base de datos: Conectada.')
};