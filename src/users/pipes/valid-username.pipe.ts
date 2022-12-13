import {
  // ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidUsernamePipe implements PipeTransform {
  transform(value: any /* metadata: ArgumentMetadata */) {
    // Validate username using regex
    const regex = /^[a-zA-Z0-9_]{3,20}$/;

    if (!regex.test(value.username)) {
      throw new BadRequestException(
        'Invalid username, please use only letters, numbers and underscores',
      );
    }

    return value;
  }
}
