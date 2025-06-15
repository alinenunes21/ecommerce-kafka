package com.ecommerce.notification;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    
    @KafkaListener(topics = "inventory-events", groupId = "notification-group")
    public void processEvent(String message) {
        System.out.println("📨 Notificação recebida: " + message);
        System.out.println("📧 Email enviado!");
        System.out.println("📱 SMS enviado!");
    }
}