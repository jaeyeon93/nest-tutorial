import { Account } from '../../src/accounts/account';


describe('Account Test', () => {
  test('Account 객체 생성 테스트', () => {
    const account: Account = new Account('uuid', 'hello@email.com', '12345');
    expect(account.getId()).toBe('uuid');
    expect(account.getEmail()).toBe('hello@email.com');
  })
});
