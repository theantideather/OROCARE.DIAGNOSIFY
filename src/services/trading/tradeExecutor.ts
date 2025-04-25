import { WalletValidator } from './validators/walletValidator';
import { TradeValidator } from './validators/tradeValidator';
import { TradeLogger } from './logger/tradeLogger';
import { JupiterService } from './jupiterService';
import type { ChartAnalysis } from '../../types';
import type { TradeResult } from './types';

export class TradeExecutor {
  static async executeTrade(
    analysis: ChartAnalysis,
    amount: number,
    inputMint: string,
    outputMint: string
  ): Promise<TradeResult> {
    try {
      // Log trade attempt
      TradeLogger.logTradeAttempt({
        analysis,
        amount,
        inputMint,
        outputMint
      });

      // Validate wallet connection
      await WalletValidator.validateConnection();

      // Validate trade parameters
      TradeValidator.validateParameters(inputMint, outputMint, amount);

      // Validate wallet balance
      await WalletValidator.validateBalance(amount);

      // Execute trade through Jupiter
      const result = await JupiterService.executeTrade({
        inputMint,
        outputMint,
        amount,
        slippageBps: 50 // 0.5% slippage
      });

      if (result.success) {
        TradeLogger.logTradeSuccess(result.txId!, {
          amount,
          inputMint,
          outputMint
        });
      } else {
        TradeLogger.logTradeError(new Error(result.error!), {
          amount,
          inputMint,
          outputMint
        });
      }

      return result;

    } catch (error: any) {
      TradeLogger.logTradeError(error, {
        amount,
        inputMint,
        outputMint
      });

      return {
        success: false,
        error: error.message
      };
    }
  }
}