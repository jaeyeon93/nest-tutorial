import {Repository, EntityRepository} from 'typeorm';
import {Account} from './account.entity';

@EntityRepository(Account)
export class AccountsRepository extends Repository<Account> {

}
