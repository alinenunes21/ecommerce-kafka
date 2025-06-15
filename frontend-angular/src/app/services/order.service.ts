// src/app/services/order.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, OrderResponse } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  private readonly API_URL = 'http://localhost:8081/orders';
  
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /**
   * Cria um novo pedido
   * @param order - Dados do pedido
   * @returns Observable com a resposta da API
   */
  createOrder(order: Order): Observable<string> {
    console.log('🚀 Enviando pedido para API:', order);
    
    return this.http.post<string>(
      this.API_URL, 
      order, 
      { 
        ...this.httpOptions,
        responseType: 'text' as 'json'
      }
    );
  }

  /**
   * Verifica se a API está funcionando
   * @returns Observable com status da API
   */
  healthCheck(): Observable<string> {
    return this.http.get<string>(
      `${this.API_URL}/health`,
      { 
        responseType: 'text' as 'json'
      }
    );
  }
}