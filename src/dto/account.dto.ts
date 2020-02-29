import { Account } from '../account/account';

export class AccountDto {
  private _id: string;
  private _email: string;
  private _password: string;

  constructor(id: string, email: string, password: string) {
    this._id = id;
    this._email = email;
    this._password = password;
    console.log(`account dto 생성`);
  }

  getId(): string {
    return this._id;
  }

  getEmail(): string {
    return this._email;
  }

  getPassword(): string {
    return this._password;
  }


  setId(value: string) {
    this._id = value;
  }

  setEmail(value: string) {
    this._email = value;
  }

  setPassword(value: string) {
    this._password = value;
  }

  // of(): Account {
  //   return new Account(this.getId(), this.getEmail(), this.getPassword())
  // }
}
