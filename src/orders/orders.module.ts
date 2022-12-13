import { Module } from '@nestjs/common';
import { StoresModule } from 'src/stores/stores.module';

@Module({
  providers: [StoresModule],
})
export class OrdersModule {}
