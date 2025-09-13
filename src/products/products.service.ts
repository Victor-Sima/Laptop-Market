import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'UltraBook X1', brand: 'BrandA', price: 1299, specs: '8GB RAM, 256GB SSD', inStock: true },
    { id: 2, name: 'WorkMate Pro', brand: 'BrandB', price: 999, specs: '16GB RAM, 512GB SSD', inStock: true },
    { id: 3, name: 'Gamer Beast 15', brand: 'BrandC', price: 1599, specs: '16GB RAM, RTX3060', inStock: true },
    { id: 4, name: 'BudgetBook 14', brand: 'BrandD', price: 499, specs: '8GB RAM, 128GB SSD', inStock: false },
    { id: 5, name: 'Student Slim', brand: 'BrandE', price: 599, specs: '8GB RAM, 256GB SSD', inStock: true },
    { id: 6, name: 'Creator 16', brand: 'BrandF', price: 1799, specs: '32GB RAM, 1TB SSD', inStock: true },
    { id: 7, name: 'TinyGo 11', brand: 'BrandG', price: 399, specs: '4GB RAM, 64GB eMMC', inStock: false },
    { id: 8, name: 'Business Elite', brand: 'BrandH', price: 1399, specs: '16GB RAM, 512GB SSD', inStock: true },
    { id: 9, name: 'Hybrid 2-in-1', brand: 'BrandI', price: 899, specs: '8GB RAM, 256GB SSD, Touch', inStock: true },
    { id: 10, name: 'MegaPower 17', brand: 'BrandJ', price: 2099, specs: '32GB RAM, RTX4070', inStock: false },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findById(id: number): Product {
    const p = this.products.find(prod => prod.id === id);
    if (!p) throw new NotFoundException('Product not found');
    return p;
  }

  search(filters: { name?: string; minPrice?: number; maxPrice?: number }): Product[] {
    let res = this.products;
    if (filters.name) {
      const q = filters.name.toLowerCase();
      res = res.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    if (typeof filters.minPrice === 'number') {
      res = res.filter(p => p.price >= filters.minPrice);
    }
    if (typeof filters.maxPrice === 'number') {
      res = res.filter(p => p.price <= filters.maxPrice);
    }
    return res;
  }

  update(id: number, patch: Partial<Product>): Product {
    const idx = this.products.findIndex(p => p.id === id);
    if (idx === -1) throw new NotFoundException('Product not found');
    this.products[idx] = { ...this.products[idx], ...patch };
    return this.products[idx];
  }
}
