import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { ProductsService } from '../products/products.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('reports')
  getReports() {
    const products = this.productsService.findAll();
    const total = products.length;
    const avgPrice = Number((products.reduce((s, p) => s + p.price, 0) / total).toFixed(2));
    const outOfStock = products.filter(p => !p.inStock).length;
    return { total, avgPrice, outOfStock };
  }

  @Put('edit/:id')
  editProduct(@Param('id') id: string, @Body() patch: Partial<any>) {
    // patch poate conține price, name, inStock etc.
    return this.productsService.update(Number(id), patch);
  }
}
