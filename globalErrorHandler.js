const winston = require('winston');

// Set up winston logger with custom settings
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.json(),
    defaultMeta: { service: 'smart-contracts' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.Console()
    ]
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', {
        promise: promise,
        reason: reason,
        timestamp: new Date().toISOString()
    });
    // Consider a graceful shutdown here
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception:', {
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
    });
    // Consider a graceful shutdown here
    process.exit(1);
});

console.log("Global error handlers set up.");
