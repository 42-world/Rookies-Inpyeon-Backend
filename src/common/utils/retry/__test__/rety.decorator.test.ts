import { Retry } from '../retry.decorator';

describe('RetyDecorator', () => {
  it('sync 성공', () => {
    class Tester {
      @Retry()
      test() {
        return 'test';
      }
    }

    const tester = new Tester();
    const result = tester.test();

    expect(result).toMatchInlineSnapshot(`"test"`);
  });

  it('sync 실패', () => {
    class Tester {
      @Retry()
      test() {
        throw new Error('test error');
      }
    }

    const tester = new Tester();
    const sut = () => tester.test();

    expect(sut).toThrowErrorMatchingInlineSnapshot(`"test error"`);
  });

  it('async 성공', async () => {
    class Tester {
      @Retry()
      async test() {
        return 'test';
      }
    }

    const tester = new Tester();
    const result = await tester.test();

    expect(result).toMatchInlineSnapshot(`"test"`);
  });

  it('async 실패', async () => {
    class Tester {
      @Retry()
      async test() {
        throw new Error('test error');
      }
    }

    const tester = new Tester();
    const sut = () => tester.test();

    await expect(sut).rejects.toThrowErrorMatchingInlineSnapshot(
      `"test error"`,
    );
  });
});
