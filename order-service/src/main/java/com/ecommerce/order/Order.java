package com.ecommerce.order;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonFormat;

// Imports do JPA
import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {
    
    @Id
    private String id;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;
    
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderItem> items;
    
    // Construtor padrão
    public Order() {
        this.id = UUID.randomUUID().toString();
        this.timestamp = LocalDateTime.now();
    }
    
    // Construtor com parâmetros
    public Order(List<OrderItem> items) {
        this();
        this.items = items;
        // Definir a referência da order em cada item
        if (items != null) {
            items.forEach(item -> item.setOrder(this));
        }
    }
    
    // Getters e Setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    
    public List<OrderItem> getItems() {
        return items;
    }
    
    public void setItems(List<OrderItem> items) {
        this.items = items;
        // Definir a referência da order em cada item
        if (items != null) {
            items.forEach(item -> item.setOrder(this));
        }
    }
    
    @Override
    public String toString() {
        return "Order{" +
                "id='" + id + '\'' +
                ", timestamp=" + timestamp +
                ", items=" + items +
                '}';
    }
}