// src/app/app.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { OrderFormComponent } from './components/order-form/order-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, OrderFormComponent],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>🛒 E-commerce Pro</h1>
        <p>Sistema de Gestão de Pedidos</p>
      </header>
      
      <main class="app-main">
        <app-order-form></app-order-form>
      </main>
      
      <footer class="app-footer">
        <p>Sistema desenvolvido com tecnologias modernas</p>
      </footer>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: #f8f9fb;
    }
    
    .app-header {
      background: linear-gradient(135deg, #334155 0%, #475569 100%);
      color: white;
      text-align: center;
      padding: 30px 20px;
      box-shadow: 0 4px 15px rgba(51, 65, 85, 0.3);
      position: relative;
      overflow: hidden;
    }
    
    .app-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: 
        radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 2px, transparent 2px),
        radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 2px, transparent 2px),
        radial-gradient(circle at 40% 20%, rgba(255,255,255,0.08) 1px, transparent 1px),
        radial-gradient(circle at 60% 80%, rgba(255,255,255,0.08) 1px, transparent 1px);
      background-size: 50px 50px, 60px 60px, 30px 30px, 40px 40px;
      pointer-events: none;
    }
    
    .app-header::after {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 200px;
      height: 200px;
      background: linear-gradient(45deg, rgba(255,255,255,0.1), transparent);
      border-radius: 50%;
      pointer-events: none;
    }
    
    .app-header h1, .app-header p {
      position: relative;
      z-index: 2;
    }
    
    .app-header h1 {
      margin: 0 0 10px 0;
      font-size: 2.5em;
      font-weight: 300;
    }
    
    .app-header p {
      margin: 0;
      font-size: 1.2em;
      opacity: 0.9;
    }
    
    .app-main {
      padding: 40px 20px;
    }
    
    .app-footer {
      background: #1e3a8a;
      color: white;
      text-align: center;
      padding: 20px;
      margin-top: 50px;
    }
    
    .app-footer p {
      margin: 0;
      opacity: 0.8;
    }
  `]
})
export class AppComponent {
  title = 'frontend-angular';
}