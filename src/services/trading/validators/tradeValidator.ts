import { TRADE_CONFIG } from '../constants';

export class TradeValidator {
  static validateParameters(inputMint: string, outputMint: string, amount: number): void {
    if (!inputMint || !outputMint) {
      throw new Error('Invalid token addresses');
    }

    if (!amount || amount <= 0) {
      throw new Error('Invalid trade amount');
    }

    if (amount < TRADE_CONFIG.MIN_TRADE_SIZE_USD) {
      throw new Error(`Minimum trade size is $${TRADE_CONFIG.MIN_TRADE_SIZE_USD}`);
    }

    if (amount > TRADE_CONFIG.MAX_TRADE_SIZE_USD) {
      throw new Error(`Maximum trade size is $${TRADE_CONFIG.MAX_TRADE_SIZE_USD}`);
    }
  }

  static validateSlippage(slippage: number): void {
    if (slippage < 0 || slippage > 100) {
      throw new Error('Invalid slippage percentage');
    }
  }
}