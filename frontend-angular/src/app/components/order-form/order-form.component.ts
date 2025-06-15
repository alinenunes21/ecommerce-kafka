// src/app/components/order-form/order-form.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Order, OrderItem } from '../../models/order.model';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  
  orderForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService
  ) {
    this.orderForm = this.fb.group({
      items: this.fb.array([this.createItemGroup()])
    });
  }

  /**
   * Cria um grupo de formulário para um item
   */
  createItemGroup(): FormGroup {
    return this.fb.group({
      productName: ['', [Validators.required, Validators.minLength(2)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0.01)]]
    });
  }

  /**
   * Getter para acessar o FormArray de itens
   */
  get items(): FormArray {
    return this.orderForm.get('items') as FormArray;
  }

  /**
   * Adiciona um novo item ao formulário
   */
  addItem(): void {
    this.items.push(this.createItemGroup());
  }

  /**
   * Remove um item do formulário
   */
  removeItem(index: number): void {
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
  }

  /**
   * Envia o pedido para a API
   */
  onSubmit(): void {
    if (this.orderForm.valid) {
      this.isLoading = true;
      this.successMessage = '';
      this.errorMessage = '';

      const order: Order = {
        items: this.orderForm.value.items
      };

      console.log('📦 Enviando pedido:', order);

      this.orderService.createOrder(order).subscribe({
        next: (response: string) => {
          console.log('✅ Resposta da API:', response);
          this.successMessage = 'Pedido criado com sucesso! Sua solicitação foi processada.';
          this.resetForm();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('❌ Erro na API:', error);
          this.errorMessage = `Erro ao criar pedido: ${error.message || 'Erro desconhecido'}`;
          this.isLoading = false;
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  /**
   * Reseta o formulário após sucesso
   */
  private resetForm(): void {
    this.orderForm.reset();
    this.items.clear();
    this.addItem(); // Adiciona um item inicial
  }

  /**
   * Marca todos os campos como touched para mostrar erros
   */
  private markFormGroupTouched(): void {
    Object.keys(this.orderForm.controls).forEach(key => {
      const control = this.orderForm.get(key);
      control?.markAsTouched();

      if (control instanceof FormArray) {
        control.controls.forEach(item => {
          Object.keys(item.value).forEach(itemKey => {
            item.get(itemKey)?.markAsTouched();
          });
        });
      }
    });
  }

  /**
   * Verifica se um campo tem erro
   */
  hasError(index: number, field: string): boolean {
    const item = this.items.at(index);
    const control = item.get(field);
    return !!(control?.invalid && control?.touched);
  }

  /**
   * Retorna a mensagem de erro para um campo
   */
  getErrorMessage(index: number, field: string): string {
    const item = this.items.at(index);
    const control = item.get(field);
    
    if (control?.errors?.['required']) {
      return `${field} é obrigatório`;
    }
    if (control?.errors?.['minLength']) {
      return `${field} deve ter pelo menos 2 caracteres`;
    }
    if (control?.errors?.['min']) {
      return `${field} deve ser maior que zero`;
    }
    return '';
  }

  /**
   * Calcula o total do pedido
   */
  getTotal(): number {
    return this.items.controls.reduce((total, item) => {
      const quantity = item.get('quantity')?.value || 0;
      const price = item.get('price')?.value || 0;
      return total + (quantity * price);
    }, 0);
  }
}