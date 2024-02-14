// this is generic Api we use for errors

class ApiError extends Error {
  constructor(statusCode, message, stack = "", errors = [], success = false) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
    this.success = success;
    if (stack) {
      this.stack = stack;
    } else {
      // if there is no stack provided then capture stack
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
