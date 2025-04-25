export class TradeLogger {
  static logTradeAttempt(params: any) {
    console.log('Trade Attempt:', {
      timestamp: new Date().toISOString(),
      ...params
    });
  }

  static logTradeError(error: Error, params: any) {
    console.error('Trade Error:', {
      timestamp: new Date().toISOString(),
      error: error.message,
      ...params
    });
  }

  static logTradeSuccess(txId: string, params: any) {
    console.log('Trade Success:', {
      timestamp: new Date().toISOString(),
      transactionId: txId,
      ...params
    });
  }
}