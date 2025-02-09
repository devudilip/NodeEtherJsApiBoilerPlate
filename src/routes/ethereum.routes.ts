import { Router } from 'express';
import { getAddressInfo } from '../controllers/ethereum.controller';

const router = Router();

// Get address info (balance and transaction count)
router.get('/address/:address', getAddressInfo);

export default router;
