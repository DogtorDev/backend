import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class UserTakenFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    switch (exception.code) {
      case 11000:
        const ctx = host.switchToHttp(),
          response = ctx.getResponse();

        return response.status(409).json({
          statusCode: 409,
          message: ['username or email already exists'],
          error: 'Conflict',
        });
    }
  }
}
