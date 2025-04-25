export class RetryHandler {
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  static async withRetry<T>(
    operation: () => Promise<T>,
    maxAttempts: number,
    delayMs: number
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error: any) {
        lastError = error;
        
        // Don't retry on authentication errors or invalid requests
        if (error.status === 401 || error.status === 400) {
          throw error;
        }

        // Last attempt failed, throw the error
        if (attempt === maxAttempts) {
          throw error;
        }

        // Wait before retrying
        await this.delay(delayMs * attempt);
      }
    }

    // This should never happen due to the throw in the loop
    throw lastError || new Error('Retry operation failed');
  }
}