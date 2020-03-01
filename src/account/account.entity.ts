import { AccountDto } from '../dto/account.dto';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

   @Column({length: 40, unique: true})
   private readonly userId: string;

   @Column({length: 40, unique: true})
   private readonly email: string;

   @Column({length: 256, nullable: false})
   private readonly password: string;

   constructor(userId: string, email: string, password: string) {
     this.userId = userId;
     this.email = email;
     this.password = password;
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

    of(): AccountDto {
     return new AccountDto(this.getId(), this.getEmail(), this.getPassword());
    }
}
