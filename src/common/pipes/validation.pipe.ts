import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe<T> implements PipeTransform<Record<string, string>> {
  async transform(
    value: Record<string, string>,
    { metatype }: ArgumentMetadata,
  ): Promise<object> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object: object = plainToClass(metatype, trimValue(value));
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException({
        message: `Validation error`,
        errors: errors.map((error) => error.property),
      });
    }
    return value;
  }
  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

const trimValue = (value: Record<string, string>): Record<string, string> => {
  const newValue = {};
  for (const key in value) {
    newValue[key] = value[key].trim();
  }

  return newValue;
};
