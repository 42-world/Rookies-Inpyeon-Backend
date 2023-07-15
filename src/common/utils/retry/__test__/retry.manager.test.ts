import { RetryManager } from '../retry.manager';

describe('RetryManager', () => {
  it('2번 에러나면 세번째까지 재시도한다', () => {
    const retryManager = new RetryManager(3);

    let count = 0;
    const result = retryManager.runSync(() => {
      count++;
      if (count < 3) throw new Error(`test error ${count}`);

      return `test${count}`;
    });

    expect(result).toMatchInlineSnapshot(`"test3"`);
  });

  it('재시도해도 에러나면 마지막 에러를 던진다', () => {
    const retryManager = new RetryManager(3);

    let count = 0;
    const sut = () =>
      retryManager.runSync(() => {
        count++;
        if (count < 4) throw new Error(`test error ${count}`);

        return `test${count}`;
      });

    expect(sut).toThrowErrorMatchingInlineSnapshot(`"test error 3"`);
  });
});
