import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock_quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  // Produtos de exemplo (mesmos do banco)
  private products: Product[] = [
    {
      id: 1,
      name: 'PlayStation 5',
      description: 'Console PS5 com controle DualSense',
      price: 4999.99,
      image_url: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400',
      category: 'Games',
      stock_quantity: 10
    },
    {
      id: 2,
      name: 'iPhone 15',
      description: 'Smartphone Apple iPhone 15',
      price: 7999.99,
      image_url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      category: 'Celulares',
      stock_quantity: 5
    },
    {
      id: 3,
      name: 'Samsung Galaxy S24',
      description: 'Smartphone Samsung top de linha',
      price: 3999.99,
      image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
      category: 'Celulares',
      stock_quantity: 8
    },
    {
      id: 4,
      name: 'MacBook Air M2',
      description: 'Notebook Apple com chip M2, 256GB SSD',
      price: 9999.99,
      image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      category: 'Computadores',
      stock_quantity: 6
    },
    {
      id: 5,
      name: 'Dell XPS 13',
      description: 'Ultrabook Dell com Intel i7, 512GB SSD',
      price: 7499.99,
      image_url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
      category: 'Computadores',
      stock_quantity: 4
    },
    {
      id: 6,
      name: 'AirPods Pro',
      description: 'Fones de ouvido Apple com cancelamento de ruído',
      price: 2499.99,
      image_url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400',
      category: 'Audio',
      stock_quantity: 15
    },
    {
      id: 7,
      name: 'Sony WH-1000XM5',
      description: 'Headphone Sony com cancelamento de ruído',
      price: 1899.99,
      image_url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400',
      category: 'Audio',
      stock_quantity: 12
    },
    {
      id: 8,
      name: 'Nintendo Switch',
      description: 'Console portátil Nintendo com Joy-Con',
      price: 2299.99,
      image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
      category: 'Games',
      stock_quantity: 8
    },
    {
      id: 9,
      name: 'Xbox Series X',
      description: 'Console Microsoft Xbox Series X 1TB',
      price: 4499.99,
      image_url: 'https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=400',
      category: 'Games',
      stock_quantity: 7
    },
    {
      id: 10,
      name: 'iPad Air',
      description: 'Tablet Apple iPad Air com tela de 10.9"',
      price: 4999.99,
      image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
      category: 'Tablets',
      stock_quantity: 9
    },
    {
      id: 11,
      name: 'Samsung Tab S9',
      description: 'Tablet Samsung com S Pen incluída',
      price: 3799.99,
      image_url: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=400',
      category: 'Tablets',
      stock_quantity: 6
    },
    {
      id: 12,
      name: 'Apple Watch Series 9',
      description: 'Smartwatch Apple com GPS e cellular',
      price: 3299.99,
      image_url: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400',
      category: 'Smartwatch',
      stock_quantity: 11
    }
  ];

  getAllProducts(): Observable<Product[]> {
    return of(this.products);
  }
}