import { Account } from '../account/account.entity';

export class AccountDto {
  private userId: string;
  private email: string;
  private password: string;

  constructor(userId: string, email: string, password: string) {
    this.userId = userId;
    this.email = email;
    this.password = password;
    console.log(`account dto 생성`);
  }

  getId(): string {
    return this.userId;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }


  setId(value: string) {
    this.userId = value;
  }

  setEmail(value: string) {
    this.email = value;
  }

  setPassword(value: string) {
    this.password = value;
  }

  of(): Account {
    return new Account(this.getId(), this.getEmail(), this.getPassword())
  }
}
