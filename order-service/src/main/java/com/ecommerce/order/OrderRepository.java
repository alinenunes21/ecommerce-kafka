package com.ecommerce.order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
    // JpaRepository já vem com métodos básicos:
    // save(), findById(), findAll(), deleteById(), etc.
    
    // Você pode adicionar métodos personalizados se quiser, por exemplo:
    // List<Order> findByStatus(String status);
}