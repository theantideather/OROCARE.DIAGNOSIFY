import { BybitService } from './bybitService';
import { BybitWallet } from './bybitWallet';
import type { ChartAnalysis } from '../../../types';
import type { BybitOrder, BybitResponse } from './types';

export class BybitTradeExecutor {
  static async executeTrade(
    analysis: ChartAnalysis,
    symbol: string,
    quantity: string
  ): Promise<BybitResponse> {
    try {
      const config = BybitWallet.getConfig();
      if (!config) {
        throw new Error('Please connect your Bybit account first');
      }

      const bybitService = new BybitService(config);
      const side = analysis.trend === 'bullish' ? 'Buy' : 'Sell';

      const order: BybitOrder = {
        symbol,
        side,
        orderType: 'Market',
        qty: quantity
      };

      return await bybitService.placeOrder(order);
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to execute trade'
      };
    }
  }
}