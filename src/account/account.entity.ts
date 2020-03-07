import { AccountDto } from '../dto/account.dto';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { IsDate, IsHash, IsString } from 'class-validator';

@Entity()
export class Account {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column({length: 40, unique: true})
   private readonly email: string;

   @Column({length: 512, nullable: false})
   private readonly password: string;

   @Column({nullable: true})
   @IsString()
   private accessToken: string;

   @CreateDateColumn()
   @IsDate()
   private created_at: Date;

   @UpdateDateColumn()
   @IsDate()
   private updated_at: Date;

   constructor(email: string, password: string) {
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

    getCreatedDate(): Date {
     return this.created_at;
    }

    getUpdateDate(): Date {
     return this.updated_at;
    }

    getAccessToken(): string {
     return this.accessToken;
    }

    setAccessToken(value: string) {
      this.accessToken = value;
    }

    of(): AccountDto {
     return new AccountDto(this.getEmail(), this.getPassword());
    }
}
