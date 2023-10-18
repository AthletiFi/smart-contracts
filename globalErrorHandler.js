/**
 * Logger Configuration for the Smart Contracts Project
 * 
 * This configuration sets up a logger using the Winston library.
 * The logger is designed to produce human-readable logs for both console and file outputs.
 * It also handles uncaught exceptions and unhandled promise rejections, logging them to a dedicated file.
 * 
 * Key Features:
 * - Logs are timestamped.
 * - Different log levels (info, error, etc.) are supported.
 * - Uncaught exceptions and unhandled promise rejections are logged to 'uncaughtExceptions.log'.
 * - Regular error logs are written to 'error.log'.
 * - The format is designed to be human-readable, with clear separations between log entries and stack traces.
 */

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  // Set the default logging level. Can be overridden when logging specific messages.
  level: 'info',

  // Define the format for the logs.
  format: format.combine(
    // Timestamp each log entry.
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),

    // Define a custom format for the log messages.
    format.printf(info => {
      // Basic log message format.
      let logMessage = `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`;

      // If there's a stack trace, append it to the log message.
      if (info.stack) {
        logMessage += `\nStack Trace:\n${info.stack}`;
      }

      return logMessage;
    })
  ),

  // Define the transports (i.e., where the logs go).
  transports: [
    // Log to the console.
    new transports.Console(),

    // Log errors to a file.
    new transports.File({ filename: 'error.log', level: 'error' })
  ]
});

// Handle uncaught exceptions and unhandled promise rejections.
// These will be logged to a dedicated file.
logger.exceptions.handle(
  new transports.File({ filename: 'uncaughtExceptions.log' })
);

process.on('unhandledRejection', (reason, promise) => {
  throw reason;
});

logger.on('error', (err) => {
  console.error('Error occurred within logger:', err);
});
module.exports
