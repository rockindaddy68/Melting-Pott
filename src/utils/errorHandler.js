// Error Handling Utilities
export class ApiError extends Error {
  constructor(message, status = 500, code = 'API_ERROR') {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

export class DatabaseError extends Error {
  constructor(message, operation = 'unknown') {
    super(message);
    this.name = 'DatabaseError';
    this.operation = operation;
  }
}

export class ValidationError extends Error {
  constructor(message, field = null) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

// Standard Error Response Handler
export const handleApiError = (error, context = 'API') => {
  console.error(`${context} Error:`, error);
  
  if (error instanceof ApiError) {
    return {
      success: false,
      message: error.message,
      code: error.code,
      status: error.status
    };
  }
  
  if (error instanceof ValidationError) {
    return {
      success: false,
      message: error.message,
      field: error.field,
      type: 'validation'
    };
  }
  
  if (error instanceof DatabaseError) {
    return {
      success: false,
      message: 'Datenbankfehler aufgetreten',
      operation: error.operation
    };
  }
  
  return {
    success: false,
    message: error.message || 'Ein unbekannter Fehler ist aufgetreten'
  };
};

// Response Wrapper für Backend
export const createSuccessResponse = (data, message = 'Erfolgreich') => ({
  success: true,
  message,
  ...data
});

export const createErrorResponse = (error, status = 500) => {
  const errorResponse = handleApiError(error);
  return {
    status,
    ...errorResponse
  };
};