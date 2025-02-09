import dotenv from 'dotenv';
import { cleanEnv, str, port, num } from 'envalid';

dotenv.config();

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production'], default: 'development' }),
  PORT: port({ default: 3000 }),
  ETH_NETWORK: str({ choices: ['mainnet', 'goerli', 'sepolia'], default: 'mainnet' }),
  INFURA_PROJECT_ID: str(),
  RATE_LIMIT_WINDOW_MS: num({ default: 15 * 60 * 1000 }), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: num({ default: 100 }) // 100 requests per window
});

export default env;
