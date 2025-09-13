import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('list')
  getList() {
    return this.productsService.findAll();
  }

  @Get('details/:id')
  getDetails(@Param('id') id: string) {
    return this.productsService.findById(Number(id));
  }

  // /products/search?name=...&minPrice=...&maxPrice=...
  @Get('search')
  search(
    @Query('name') name?: string,
    @Query('minPrice') minPrice?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    const filters = {
      name,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    };
    return this.productsService.search(filters);
  }
}
