import is from '@sindresorhus/is';
import { RetryManager } from './retry.manager';
import { RetryOptions } from './retry.options';

export const Retry = (retryOptions?: RetryOptions) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;
    const attempts = retryOptions?.attempts ?? 3;

    const retry = new RetryManager(attempts);
    if (is.asyncFunction(originalMethod)) {
      descriptor.value = async function (...args: any[]) {
        return await retry.runAsync(async () => {
          return await originalMethod.apply(this, args);
        });
      };
    } else {
      descriptor.value = function (...args: any[]) {
        return retry.runSync(() => {
          return originalMethod.apply(this, args);
        });
      };
    }
  };
};
