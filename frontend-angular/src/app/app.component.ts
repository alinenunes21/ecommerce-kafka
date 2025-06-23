import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService, Product } from './services/product.service';
import { OrderService } from './services/order.service';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  products: Product[] = [];
  cart: CartItem[] = [];
  
  // Propriedades para o alerta personalizado
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        console.log('✅ Produtos carregados da API:', products);
      },
      error: (error) => {
        console.error('❌ Erro ao carregar produtos da API:', error);
        this.showCustomAlert('Erro ao carregar produtos. Verifique se o inventory-service está rodando.');
      }
    });
  }

  addToCart(product: Product): void {
    const existingItem = this.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }
    
    console.log('🛒 Produto adicionado:', product.name);
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.id !== productId);
    console.log('❌ Produto removido do carrinho');
  }

  getCartTotal(): number {
    return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  checkout(): void {
    if (this.cart.length === 0) {
      this.showCustomAlert('Carrinho vazio!');
      return;
    }

    // Converter carrinho para pedido
    const order = {
      items: this.cart.map(item => ({
        productName: item.name,
        quantity: item.quantity,
        price: item.price
      }))
    };

    console.log('🚀 Enviando pedido:', order);

    this.orderService.createOrder(order).subscribe({
      next: (response) => {
        console.log('✅ Pedido criado:', response);
        this.showCustomAlert('Compra realizada com sucesso! 🎉');
        this.cart = []; // Limpa carrinho
      },
      error: (error) => {
        console.error('❌ Erro:', error);
        this.showCustomAlert('Erro ao processar compra: ' + error.message);
      }
    });
  }

  // Métodos para o alerta personalizado
  showCustomAlert(message: string): void {
    this.alertMessage = message;
    this.showAlert = true;
  }

  closeAlert(): void {
    this.showAlert = false;
    this.alertMessage = '';
  }
}