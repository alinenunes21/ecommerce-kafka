package com.ecommerce.inventory;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public class InventoryEvent {
    private String orderId;
    private String status; // "SUCCESS" ou "FAILED"
    private String message;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime timestamp;
    
    // Construtor padrão
    public InventoryEvent() {
        this.timestamp = LocalDateTime.now();
    }
    
    // Construtor com parâmetros
    public InventoryEvent(String orderId, String status, String message) {
        this();
        this.orderId = orderId;
        this.status = status;
        this.message = message;
    }
    
    // Getters e Setters
    public String getOrderId() {
        return orderId;
    }
    
    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    
    @Override
    public String toString() {
        return "InventoryEvent{" +
                "orderId='" + orderId + '\'' +
                ", status='" + status + '\'' +
                ", message='" + message + '\'' +
                ", timestamp=" + timestamp +
                '}';
    }
}