package com.ecommerce.inventory;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Service
public class InventoryService {
    
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;
    
    private final ObjectMapper objectMapper;
    private final Random random = new Random();
    
    private static final String OUTPUT_TOPIC = "inventory-events";
    
    // Construtor que configura o ObjectMapper
    public InventoryService() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }
    
    @KafkaListener(topics = "orders", groupId = "inventory-group")
    public void processOrder(String orderMessage) {
        try {
            System.out.println("📥 Pedido recebido: " + orderMessage);
            
            // Simula processamento de estoque (50% chance de sucesso)
            boolean hasStock = random.nextBoolean();
            
            // Extrai o ID do pedido do JSON
            String orderId = extractOrderId(orderMessage);
            
            InventoryEvent event;
            if (hasStock) {
                event = new InventoryEvent(orderId, "SUCCESS", "Estoque reservado com sucesso");
                System.out.println("✅ Estoque disponível para pedido: " + orderId);
            } else {
                event = new InventoryEvent(orderId, "FAILED", "Estoque insuficiente");
                System.out.println("❌ Estoque insuficiente para pedido: " + orderId);
            }
            
            // Converte para JSON e envia para o Kafka
            String eventJson = objectMapper.writeValueAsString(event);
            kafkaTemplate.send(OUTPUT_TOPIC, orderId, eventJson);
            
            System.out.println("📤 Evento enviado para " + OUTPUT_TOPIC + ": " + event);
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao processar pedido: " + e.getMessage());
        }
    }
    
    private String extractOrderId(String orderJson) {
        try {
            // Extrai o ID do JSON de forma simples
            return objectMapper.readTree(orderJson).get("id").asText();
        } catch (Exception e) {
            return "unknown-id";
        }
    }
}