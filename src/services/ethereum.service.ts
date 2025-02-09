import { ethers } from 'ethers';

class EthereumService {
  public readonly provider: ethers.Provider;

  constructor() {
    // Initialize provider based on environment
    const network = process.env.ETH_NETWORK || 'mainnet';
    const projectId = process.env.INFURA_PROJECT_ID;
    
    if (projectId) {
      this.provider = new ethers.InfuraProvider(network, projectId);
    } else {
      // Fallback to public provider (not recommended for production)
      this.provider = ethers.getDefaultProvider(network);
    }
  }

  /**
   * Get current block number
   * @returns Promise<number>
   */
  async getBlockNumber(): Promise<number> {
    return await this.provider.getBlockNumber();
  }

  /**
   * Get ETH balance for an address
   * @param address Ethereum address
   * @returns Balance in ETH (as a string)
   */
  async getBalance(address: string): Promise<string> {
    const balance = await this.provider.getBalance(address);
    return ethers.formatEther(balance);
  }

  /**
   * Create a contract instance
   * @param contractAddress The smart contract address
   * @param abi The contract ABI
   * @returns Contract instance
   */
  async getContract(contractAddress: string, abi: ethers.InterfaceAbi): Promise<ethers.Contract> {
    return new ethers.Contract(contractAddress, abi, this.provider);
  }
}

export default new EthereumService();
