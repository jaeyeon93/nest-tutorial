export class Account {
  /*
  id: string, using uuid
  email: string, unique
  password: string, 단방향암호화
  access_token: string, using JWT token
  created_at: Date, format : YYYY-MM-DD hh:mm:ss
  updated_at: Date
   */
 private _id: string;
 private _email: string;
 private _password: string;

 constructor(id: string, email: string, password: string) {
   this._id = id;
   this._email = email;
   this._password = password;
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
}
