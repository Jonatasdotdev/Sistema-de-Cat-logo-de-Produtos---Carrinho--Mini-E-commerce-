package com.ecommerce.catalog.repository;

import com.ecommerce.catalog.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    
    List<Product> findByNameContainingIgnoreCase(String name);
    
    List<Product> findByPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);
    
    @Query("SELECT p FROM Product p WHERE p.name LIKE %:name% AND p.price BETWEEN :minPrice AND :maxPrice")
    List<Product> findByNameAndPriceRange(@Param("name") String name, 
                                         @Param("minPrice") BigDecimal minPrice, 
                                         @Param("maxPrice") BigDecimal maxPrice);
}