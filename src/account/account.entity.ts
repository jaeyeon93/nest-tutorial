import { AccountDto } from '../dto/account.dto';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Account {
   @PrimaryGeneratedColumn("uuid")
   id: string;

   @Column({length: 40, unique: true})
   private readonly email: string;

   @Column({length: 256, nullable: false})
   private password: string;

   @Column({nullable: true})
   private accessToken: string;

   @CreateDateColumn()
   private created_at: string;

   @UpdateDateColumn()
   private updated_at: string;

   // Database에 삽입하기전 password 암호화
   @BeforeInsert()
   async hashPassword() {
     this.password = await bcrypt.hash(this.password, 10);
   }

   constructor(email: string, password: string) {
     this.email = email;
     this.password = password;
   }


   async comparePassword(attempt: string): Promise<boolean> {
     return await bcrypt.compare(attempt, this.password);
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

    getCreatedDate(): string {
     return this.created_at;
    }

    getUpdateDate(): string {
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
