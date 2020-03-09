import { Account } from '../account/account.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {

  @ApiProperty()
  private readonly accessToken: string;

  @ApiProperty()
  private readonly created_at: Date;

  @ApiProperty()
  private readonly email: string;

  @ApiProperty()
  private readonly id: string;

  @ApiProperty()
  private readonly updated_at: Date;

  constructor(account: Account) {
    this.accessToken = account.getAccessToken();
    this.created_at = account.getCreatedDate();
    this.email = account.getEmail();
    this.id = account.getId();
    this.updated_at = account.getUpdateDate();
  }
}
