import { Account } from '../../src/account/account.entity';
import { AccountDto } from '../../src/dto/account.dto';


describe('Account Test', () => {
  test('Account 객체 생성 테스트', () => {
    const account: Account = new Account('hello@email.com', '12345');
    expect(account.getEmail()).toBe('hello@email.com');
  });

  test('Account.of() => AccountDto Test', () => {
      const account: Account = new Account('email','11111');
      const dto: AccountDto = account.of();
      expect(dto.getEmail()).toBe('email');
  });
});
