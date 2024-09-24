import winston from 'winston'
import  commander  from '../utils/commander.js'

const { mode } = commander.opts()

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http:4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'blue',
        http: 'white',
        debug: 'white'
    }
}

const transports = [
    new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
            winston.format.colorize({colors: customLevelOptions.colors}),
            winston.format.simple()
        )
    })
];

if (mode === 'production') {
    transports.push(
        new winston.transports.File({
            filename: './errors.log',
            level: 'info',
            format: winston.format.simple()
        })
    );
}

export const logger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports
})

export const addLogger = ( req, res, next ) => {
    req.logger = logger
    req.logger.info(`${req.method} en ${req.url} - ${new Date().toLocaleString()}`)
    next()
}