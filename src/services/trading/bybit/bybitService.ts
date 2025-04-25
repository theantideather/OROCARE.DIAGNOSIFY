import { createHmac } from 'crypto';
import { BYBIT_CONFIG } from './config';
import type { BybitCredentials, BybitOrder, BybitResponse } from './types';

export class BybitService {
  private credentials: BybitCredentials;
  private baseUrl: string;

  constructor(credentials: BybitCredentials, useTestnet = true) {
    this.credentials = credentials;
    this.baseUrl = useTestnet ? BYBIT_CONFIG.TESTNET_URL : BYBIT_CONFIG.MAINNET_URL;
  }

  private generateSignature(parameters: Record<string, string>, timestamp: number): string {
    const orderedParams = Object.keys(parameters)
      .sort()
      .reduce((obj, key) => ({
        ...obj,
        [key]: parameters[key]
      }), {});

    const queryString = Object.entries(orderedParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    const signaturePayload = timestamp + this.credentials.apiKey + queryString;
    return createHmac('sha256', this.credentials.apiSecret)
      .update(signaturePayload)
      .digest('hex');
  }

  private async makeRequest(
    endpoint: string,
    method: string,
    params: Record<string, string>
  ) {
    const timestamp = Date.now();
    const signature = this.generateSignature(params, timestamp);

    const headers = {
      'X-BAPI-API-KEY': this.credentials.apiKey,
      'X-BAPI-SIGN': signature,
      'X-BAPI-TIMESTAMP': timestamp.toString(),
      'Content-Type': 'application/json'
    };

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers,
        body: JSON.stringify(params)
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      return await response.json();
    } catch (error: any) {
      console.error('Bybit API error:', error);
      throw new Error(error.message || 'Failed to execute request');
    }
  }

  async placeOrder(order: BybitOrder): Promise<BybitResponse> {
    try {
      const response = await this.makeRequest(
        BYBIT_CONFIG.ENDPOINTS.PLACE_ORDER,
        'POST',
        {
          symbol: order.symbol,
          side: order.side,
          orderType: order.orderType,
          qty: order.qty,
          ...(order.price && { price: order.price }),
          timeInForce: order.timeInForce || BYBIT_CONFIG.DEFAULT_OPTIONS.timeInForce
        }
      );

      if (response.retCode === 0) {
        return {
          success: true,
          orderId: response.result.orderId
        };
      }

      return {
        success: false,
        error: response.retMsg
      };

    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to place order'
      };
    }
  }
}