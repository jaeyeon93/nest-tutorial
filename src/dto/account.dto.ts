import { Account } from '../account/account.entity';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AccountDto {
  private id: string;

  @ApiProperty({
    description: 'Email Filed'
  })
  @IsString()
  @IsEmail() // iput이 이메일인지 아닌지 확인
  private email: string;

  @ApiProperty({
    description: '비밀번호 최소 8자리, 최소1개의 대문자가 포함'
  })
  @IsString()
  @MinLength(8)
  @Matches(/(?=.*[A-Z])/) // 비밀번호 최소길이가8이고, 대문자가 최소하나 포함되있는지 확인
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
