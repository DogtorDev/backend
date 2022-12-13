import { Injectable, NestMiddleware } from '@nestjs/common';
import { isAvailable } from 'src/common/utils/time';
import { StoreService } from 'src/stores/services/store.service';
import { StoreEntity } from 'src/stores/entities/store.entity';
import { ResponseEntity } from 'src/common/types/response.entity';

@Injectable()
export class IsAvailableMiddleware implements NestMiddleware {
  constructor(private readonly storeService: StoreService) {}

  use(req: any, res: any, next: () => void) {
    const { storeId, timezone } = req.body;

    async () => {
      const store: ResponseEntity = await this.storeService.getStore(storeId);

      if (!store || store.statusCode !== 200) {
        return res.status(404).json({
          statusCode: 404,
          message: 'Store not found',
        });
      }

      const { workingHours }: StoreEntity = store.data;

      if (!isAvailable(timezone, workingHours)) {
        return res.status(400).json({
          statusCode: 400,
          message: 'Store is closed',
        });
      }

      req.store = store.data;

      next();
    };
  }
}
