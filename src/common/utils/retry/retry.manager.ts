export class RetryManager {
  constructor(
    private readonly count: number, //
  ) {}

  async runAsync<T>(fn: () => Promise<T>): Promise<T> {
    let lastError: Error;
    let count = 0;
    while (count < this.count) {
      try {
        return await fn();
      } catch (e: any) {
        lastError = e;
        count++;
      }
    }

    throw lastError;
  }

  runSync<T>(fn: () => T): T {
    let lastError: Error;
    let count = 0;
    while (count < this.count) {
      try {
        return fn();
      } catch (e) {
        lastError = e;
        count++;
      }
    }

    throw lastError;
  }
}
