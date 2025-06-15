package com.ecommerce.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

@Service
public class OrderService {
    
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;
    
    @Autowired
    private OrderRepository orderRepository;  // Injeção do repository
    
    private final ObjectMapper objectMapper;
    
    private static final String TOPIC_NAME = "orders";
    
    // Construtor que configura o ObjectMapper
    public OrderService() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }
    
    public String processOrder(Order order) {
        try {
            // 1. SALVAR NO BANCO PRIMEIRO
            Order savedOrder = orderRepository.save(order);
            System.out.println("💾 Pedido salvo no banco: " + savedOrder.getId());
            
            // 2. CONVERTER PARA JSON
            String orderJson = objectMapper.writeValueAsString(savedOrder);
            
            // 3. ENVIAR PARA O KAFKA
            kafkaTemplate.send(TOPIC_NAME, savedOrder.getId(), orderJson);
            
            System.out.println("✅ Fluxo completo:");
            System.out.println("  🗄️  Salvo no banco: " + savedOrder.getId());
            System.out.println("  📤 Enviado para Kafka: " + TOPIC_NAME);
            System.out.println("  🔑 Key: " + savedOrder.getId());
            System.out.println("  📦 Order: " + savedOrder);
            
            return "Pedido " + savedOrder.getId() + " salvo no banco e enviado para Kafka com sucesso!";
            
        } catch (Exception e) {
            System.err.println("❌ Erro ao processar pedido: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Falha ao processar pedido", e);
        }
    }
}