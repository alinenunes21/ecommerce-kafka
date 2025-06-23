package com.ecommerce.inventory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/products")
    public List<Map<String, Object>> getAllProducts() {
        String sql = "SELECT id, name, description, price, image_url, category, stock_quantity FROM products ORDER BY id";
        return jdbcTemplate.queryForList(sql);
    }

    @GetMapping("/products/{id}")
    public Map<String, Object> getProductById(@PathVariable Long id) {
        String sql = "SELECT id, name, description, price, image_url, category, stock_quantity FROM products WHERE id = ?";
        return jdbcTemplate.queryForMap(sql, id);
    }
}