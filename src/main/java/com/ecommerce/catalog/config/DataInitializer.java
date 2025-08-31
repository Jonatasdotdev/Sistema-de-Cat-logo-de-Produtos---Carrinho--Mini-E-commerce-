package com.ecommerce.catalog.config;

import com.ecommerce.catalog.entity.Product;
import com.ecommerce.catalog.entity.User;
import com.ecommerce.catalog.repository.ProductRepository;
import com.ecommerce.catalog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Criar produtos iniciais
        if (productRepository.count() == 0) {
            productRepository.save(new Product("Notebook Dell Inspiron", new BigDecimal("2500.00"), 
                "Notebook Dell Inspiron 15 com Intel Core i5, 8GB RAM, SSD 256GB"));
            
            productRepository.save(new Product("Mouse Logitech MX Master", new BigDecimal("350.00"), 
                "Mouse sem fio Logitech MX Master 3 com sensor de alta precisão"));
            
            productRepository.save(new Product("Teclado Mecânico", new BigDecimal("450.00"), 
                "Teclado mecânico RGB com switches Cherry MX Blue"));
            
            productRepository.save(new Product("Monitor LG 24\"", new BigDecimal("800.00"), 
                "Monitor LG 24 polegadas Full HD IPS"));
            
            productRepository.save(new Product("Smartphone Samsung Galaxy", new BigDecimal("1200.00"), 
                "Samsung Galaxy A54 128GB com câmera tripla"));
            
            System.out.println("Produtos iniciais criados!");
        }

        // Criar usuários iniciais
        if (userRepository.count() == 0) {
            userRepository.save(new User("João Silva", "joao@email.com"));
            userRepository.save(new User("Maria Santos", "maria@email.com"));
            userRepository.save(new User("Pedro Oliveira", "pedro@email.com"));
            
            System.out.println("Usuários iniciais criados!");
        }
    }
}