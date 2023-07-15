import { CryptoManager } from '../crypto.manager';

describe('CryptoManager', () => {
  it('단방향 암호화', () => {
    const cryptoManager = new CryptoManager();

    const encrypted = cryptoManager.encrypt('hello');
    const encrypted2 = cryptoManager.encrypt('hello');

    expect(encrypted).toMatchInlineSnapshot(`"hello"`);
    expect(encrypted).toEqual(encrypted2);
  });
});
