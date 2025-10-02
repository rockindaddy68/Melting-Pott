// Backend Middleware für Error Handling
const { ValidationError, DatabaseError, ApiError } = require('../utils/errorHandler');

// Async Error Handler Wrapper
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Standard Error Response Middleware
const errorHandler = (err, req, res, next) => {
  console.error('Backend Error:', err);

  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      message: err.message,
      field: err.field,
      type: 'validation'
    });
  }

  if (err instanceof DatabaseError) {
    return res.status(500).json({
      success: false,
      message: 'Datenbankfehler aufgetreten',
      operation: err.operation
    });
  }

  if (err instanceof ApiError) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
      code: err.code
    });
  }

  // Default error
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' 
      ? 'Ein unbekannter Fehler ist aufgetreten' 
      : err.message
  });
};

// Success Response Helper
const successResponse = (res, data, message = 'Erfolgreich', status = 200) => {
  res.status(status).json({
    success: true,
    message,
    ...data
  });
};

module.exports = {
  asyncHandler,
  errorHandler,
  successResponse
};