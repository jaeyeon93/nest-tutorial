import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { AccountDto } from '../dto/account.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';


@Injectable()
export class ValidationPipe implements PipeTransform<any>{
  async transform(value: any, {metatype}: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    console.log(`${JSON.stringify(errors)}`);
    if (errors.length > 0) {
      console.log(`error`)
      throw new BadRequestException('Validation Failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
