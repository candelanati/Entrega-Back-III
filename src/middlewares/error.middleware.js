export const errorMiddleware = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? 'Error interno del servidor' : error.message;

  if (statusCode === 500) {
    console.error(error);
  }

  res.status(statusCode).json({ status: 'error', error: message });
};
