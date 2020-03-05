import { Account } from '../account/account.entity';

export class ResponseDto {
  private readonly accessToken: string;
  private readonly created_at: Date;
  private readonly email: string;
  private readonly id: string;
  private readonly updated_at: Date;

  constructor(account: Account) {
    this.accessToken = account.getAccessToken();
    this.created_at = account.getCreatedDate();
    this.email = account.getEmail();
    this.id = account.getId();
    this.updated_at = account.getUpdateDate();
  }
}
