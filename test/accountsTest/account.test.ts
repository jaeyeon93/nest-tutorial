import { Account } from '../../src/account/account';
import { AccountDto } from '../../src/dto/account.dto';


describe('Account Test', () => {
  test('Account 객체 생성 테스트', () => {
    const account: Account = new Account('uuid', 'hello@email.com', '12345');
    expect(account.getId()).toBe('uuid');
    expect(account.getEmail()).toBe('hello@email.com');
  });

  test('AccountDto.of() => Account Test', () => {
    const accountDto: AccountDto = new AccountDto('dto', 'email', '11111');
    expect(accountDto.getId()).toBe('dto');
    const account: Account = accountDto.of();
    expect(account.getId()).toBe('dto');
  });

  test('Account.of() => AccountDto Test', () => {
      const account: Account = new Account('uuid','email','11111');
      expect(account.getId()).toBe('uuid');
      const dto: AccountDto = account.of();
      expect(dto.getEmail()).toBe('email');
      expect(dto.getId()).toBe('uuid');
  });
});
