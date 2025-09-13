import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProductsModule } from './products/products.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [ProductsModule, AdminModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
