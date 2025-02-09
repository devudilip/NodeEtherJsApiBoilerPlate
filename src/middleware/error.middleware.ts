import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public source?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorContext = {
    name: error.name,
    message: error.message,
    stack: error.stack,
    path: req.path,
    method: req.method,
    ip: req.ip
  };

  if (error instanceof ApiError) {
    logger.warn('API Error:', {
      ...errorContext,
      statusCode: error.statusCode,
      source: error.source
    });

    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
      source: error.source
    });
  }

  logger.error('Unhandled Error:', errorContext);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  });
};
