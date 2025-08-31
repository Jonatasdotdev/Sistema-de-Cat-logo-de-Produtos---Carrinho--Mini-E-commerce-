package com.ecommerce.catalog.controller;

import com.ecommerce.catalog.dto.CartItemDTO;
import com.ecommerce.catalog.service.CartService;
import com.ecommerce.catalog.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    @Autowired
    private OrderService orderService;
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<CartItemDTO>> getCartItems(@PathVariable Long userId) {
        List<CartItemDTO> cartItems = cartService.getCartItems(userId);
        return ResponseEntity.ok(cartItems);
    }
    
    @PostMapping
    public ResponseEntity<?> addToCart(@Valid @RequestBody CartItemDTO cartItemDTO) {
        try {
            CartItemDTO addedItem = cartService.addToCart(cartItemDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(addedItem);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PutMapping("/{itemId}")
    public ResponseEntity<CartItemDTO> updateCartItem(@PathVariable Long itemId, 
                                                     @RequestBody Map<String, Integer> request) {
        Integer quantity = request.get("quantity");
        if (quantity == null || quantity < 1) {
            return ResponseEntity.badRequest().build();
        }
        
        return cartService.updateCartItem(itemId, quantity)
                .map(item -> ResponseEntity.ok(item))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{itemId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long itemId) {
        if (cartService.removeFromCart(itemId)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/user/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable Long userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/user/{userId}/total")
    public ResponseEntity<Map<String, BigDecimal>> getCartTotal(@PathVariable Long userId) {
        BigDecimal total = cartService.getCartTotal(userId);
        return ResponseEntity.ok(Map.of("total", total));
    }
    
    @PostMapping("/user/{userId}/checkout")
    public ResponseEntity<Map<String, Object>> checkout(@PathVariable Long userId) {
        try {
            // Criar pedido a partir do carrinho
            var orderDTO = orderService.createOrderFromCart(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Pedido criado com sucesso!");
            response.put("orderId", orderDTO.getId());
            response.put("total", orderDTO.getTotalAmount());
            
            return ResponseEntity.ok(response);
            
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Erro ao processar pedido: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}