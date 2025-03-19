import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { ERROR_INT_MESSAGE_PIPE } from '../errors';

/** Convert a string like "1" to a number, but without NaN */
@Injectable()
export class OptionalIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): number | undefined {
    if (value == null) return undefined;
    const num = Number(value);
    if (isNaN(num))
      throw new BadRequestException(
        ERROR_INT_MESSAGE_PIPE.replace('$key', metadata.data ?? ''),
      );
    return num;
  }
}
