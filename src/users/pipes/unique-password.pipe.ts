import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class UniquePasswordPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const { newPassword, oldPassword } = value;
      if (newPassword === oldPassword) {
        throw new BadRequestException(
          'New password must be different from old password',
        );
      }

      return value;
    }
  }
}
