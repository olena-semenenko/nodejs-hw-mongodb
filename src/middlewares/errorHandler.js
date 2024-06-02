import { isHttpError } from 'http-errors';
export const errorHandler = (error, req, res) => {
  if (isHttpError(error)) {
    return res.status(error.status).json({
      status: error.status,
      message: error.message,
      data: { message: error.message },
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: error.message,
  });
};
