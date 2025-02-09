import { Request, Response } from 'express';
import ethereumService from '../services/ethereum.service';

interface AddressInfoResponse {
  address: string;
  balance: string;
  transactionCount: number;
}

export const getAddressInfo = async (req: Request, res: Response) => {
  try {
    const { address } = req.params;

    // Validate Ethereum address format
    if (!address || !address.match(/^0x[a-fA-F0-9]{40}$/)) {
      return res.status(400).json({
        error: 'Invalid Address',
        message: 'Please provide a valid Ethereum address'
      });
    }

    // Get balance and transaction count
    const [balance, transactionCount] = await Promise.all([
      ethereumService.getBalance(address),
      ethereumService.provider.getTransactionCount(address)
    ]);

    const response: AddressInfoResponse = {
      address,
      balance,
      transactionCount
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching address info:', error);
    res.status(500).json({
      error: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
};
