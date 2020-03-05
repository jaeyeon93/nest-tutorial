import { Account } from '../account/account.entity';

export class AccountDto {
  private id: string;
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  update(email: string, password: string) {
    this.setEmail(email);
    this.setPassword(password);
    return this;
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

  of(): Account {
    return new Account(this.getEmail(), this.getPassword())
  }
}
