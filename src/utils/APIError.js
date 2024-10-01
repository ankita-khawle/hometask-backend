/* eslint-disable max-classes-per-file */
const httpStatus = require('http-status');

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor({
    message, errors, status }) {
    super(message);
    this.message = message;
    this.errors = errors;
    this.status = status;
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   */
  constructor({
    message,
    errors,
    status = httpStatus.INTERNAL_SERVER_ERROR,
  }) {
    super({
      message, errors, status
    });
  }
}

module.exports = APIError;
