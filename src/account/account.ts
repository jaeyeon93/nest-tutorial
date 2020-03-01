import { AccountDto } from '../dto/account.dto';

export class Account {
  /*
  id: string, using uuid
  email: string, unique
  password: string, 단방향암호화
  access_token: string, using JWT token
  created_at: Date, format : YYYY-MM-DD hh:mm:ss
  updated_at: Date
   */
 private id: string;
 private email: string;
 private password: string;

 constructor(id: string, email: string, password: string) {
   this.id = id;
   this.email = email;
   this.password = password;
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

  of(): AccountDto {
   return new AccountDto(this.getId(), this.getEmail(), this.getPassword());
  }
}
