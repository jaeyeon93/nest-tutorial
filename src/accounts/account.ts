class Account {
  /*
  id: string, using uuid
  email: string, unique
  password: string, 단방향암호화
  access_token: string, using JWT token
  created_at: Date, format : YYYY-MM-DD hh:mm:ss
  updated_at: Date
   */
   id: string;
   email: string;
   password: string;

  constructor(id: string, email: string, password: string) {
    this.id = id;
    this.email = email;
    this.password = password;
  }


  get id(): string {
    return this.id;
  }

  get email(): string {
    return this.email;
  }

  get password(): string {
    return this.password;
  }
}
