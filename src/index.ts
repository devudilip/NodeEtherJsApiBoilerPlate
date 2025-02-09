import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import config from './config';
import helloRoutes from './routes/hello.routes';
import ethereumRoutes from './routes/ethereum.routes';
import { errorHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/logging.middleware';
import logger from './utils/logger';

const app: Express = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Logging middleware
app.use(requestLogger);

// Rate limiting
const limiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  message: {
    status: 'error',
    message: 'Too many requests, please try again later.'
  }
});

app.use(limiter);

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// API documentation endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({ 
    name: 'Express TypeScript Ethers.js API',
    version: '1.0.0',
    environment: config.NODE_ENV,
    network: config.ETH_NETWORK,
    endpoints: {
      docs: '/',
      health: '/health',
      hello: '/api/hello',
      ethereum: '/api/eth/address/:address'
    }
  });
});

// Routes
app.use('/api', helloRoutes);
app.use('/api/eth', ethereumRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(config.PORT, () => {
  logger.info(`Server started`, {
    port: config.PORT,
    environment: config.NODE_ENV,
    network: config.ETH_NETWORK
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception:', { error: error.message, stack: error.stack });
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: any) => {
  logger.error('Unhandled Rejection:', { reason });
  process.exit(1);
});
