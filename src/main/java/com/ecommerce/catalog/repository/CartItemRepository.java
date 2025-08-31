package com.ecommerce.catalog.repository;

import com.ecommerce.catalog.entity.CartItem;
import com.ecommerce.catalog.entity.Product;
import com.ecommerce.catalog.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    
    List<CartItem> findByUser(User user);
    
    List<CartItem> findByUserId(Long userId);
    
    Optional<CartItem> findByUserAndProduct(User user, Product product);
    
    void deleteByUser(User user);
    
    void deleteByUserId(Long userId);
}