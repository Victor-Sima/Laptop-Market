export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  specs?: string;
  inStock: boolean;
}
