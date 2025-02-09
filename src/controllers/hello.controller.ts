import { Request, Response } from 'express';
import helloService from '../services/hello.service';

export const getHello = (req: Request, res: Response) => {
  try {
    const response = helloService.getHelloMessage();
    res.json(response);
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};
