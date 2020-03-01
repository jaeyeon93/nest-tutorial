import { AccountEntity } from '../account/account.entity';

export class AccountDto {
  private id: string;
  private email: string;
  private password: string;

  constructor(id: string, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    console.log(`account dto 생성`);
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }


  setId(value: string) {
    this.id = value;
  }

  setEmail(value: string) {
    this.email = value;
  }

  setPassword(value: string) {
    this.password = value;
  }

  of(): AccountEntity {
    return new AccountEntity(this.getId(), this.getEmail(), this.getPassword())
  }
}
