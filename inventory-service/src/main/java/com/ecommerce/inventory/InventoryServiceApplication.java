package com.ecommerce.inventory;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class InventoryServiceApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(InventoryServiceApplication.class, args);
        System.out.println("Inventory Service iniciado com sucesso!");
        System.out.println("Consumindo tópico: orders");
        System.out.println("Produzindo tópico: inventory-events");
    }
}