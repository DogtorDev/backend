import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreCategorySchema } from './schemas/store-category.schema';
import { StoreSchema } from './schemas/store.schema';
import { StoreService } from './services/store.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'StoreCategory', schema: StoreCategorySchema },
      { name: 'Store', schema: StoreSchema },
    ]),
  ],
  providers: [StoreService],
  exports: [StoreService],
})
export class StoresModule {}
