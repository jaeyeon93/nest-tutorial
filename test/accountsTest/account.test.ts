import { AccountEntity } from '../../src/account/account.entity';
import { AccountDto } from '../../src/dto/account.dto';


describe('AccountEntity Test', () => {
  test('AccountEntity 객체 생성 테스트', () => {
    const account: AccountEntity = new AccountEntity('uuid', 'hello@email.com', '12345');
    expect(account.getId()).toBe('uuid');
    expect(account.getEmail()).toBe('hello@email.com');
  });

  test('AccountDto.of() => AccountEntity Test', () => {
    const accountDto: AccountDto = new AccountDto('dto', 'email', '11111');
    expect(accountDto.getId()).toBe('dto');
    const account: AccountEntity = accountDto.of();
    expect(account.getId()).toBe('dto');
  });

  test('AccountEntity.of() => AccountDto Test', () => {
      const account: AccountEntity = new AccountEntity('uuid','email','11111');
      expect(account.getId()).toBe('uuid');
      const dto: AccountDto = account.of();
      expect(dto.getEmail()).toBe('email');
      expect(dto.getId()).toBe('uuid');
  });
});
