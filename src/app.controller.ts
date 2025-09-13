import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products/products.service';

@Controller()
export class AppController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('list')
  getList() {
    return this.productsService.findAll();
  }

  @Get('details/:id')
  getDetails(@Param('id') id: string) {
    return this.productsService.findById(Number(id));
  }
}
