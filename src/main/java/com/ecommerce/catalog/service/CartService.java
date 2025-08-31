package com.ecommerce.catalog.service;

import com.ecommerce.catalog.dto.CartItemDTO;
import com.ecommerce.catalog.entity.CartItem;
import com.ecommerce.catalog.entity.Product;
import com.ecommerce.catalog.entity.User;
import com.ecommerce.catalog.repository.CartItemRepository;
import com.ecommerce.catalog.repository.ProductRepository;
import com.ecommerce.catalog.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class CartService {
    
    @Autowired
    private CartItemRepository cartItemRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    public List<CartItemDTO> getCartItems(Long userId) {
        return cartItemRepository.findByUserId(userId).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public CartItemDTO addToCart(CartItemDTO cartItemDTO) {
        User user = userRepository.findById(cartItemDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        Product product = productRepository.findById(cartItemDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        
        // Verifica se o item já existe no carrinho
        Optional<CartItem> existingItem = cartItemRepository.findByUserAndProduct(user, product);
        
        CartItem cartItem;
        if (existingItem.isPresent()) {
            // Se já existe, atualiza a quantidade
            cartItem = existingItem.get();
            cartItem.setQuantity(cartItem.getQuantity() + cartItemDTO.getQuantity());
        } else {
            // Se não existe, cria um novo item
            cartItem = new CartItem(user, product, cartItemDTO.getQuantity());
        }
        
        CartItem savedItem = cartItemRepository.save(cartItem);
        return convertToDTO(savedItem);
    }
    
    public Optional<CartItemDTO> updateCartItem(Long itemId, Integer quantity) {
        return cartItemRepository.findById(itemId)
                .map(cartItem -> {
                    cartItem.setQuantity(quantity);
                    CartItem updatedItem = cartItemRepository.save(cartItem);
                    return convertToDTO(updatedItem);
                });
    }
    
    public boolean removeFromCart(Long itemId) {
        if (cartItemRepository.existsById(itemId)) {
            cartItemRepository.deleteById(itemId);
            return true;
        }
        return false;
    }
    
    public void clearCart(Long userId) {
        cartItemRepository.deleteByUserId(userId);
    }
    
    public BigDecimal getCartTotal(Long userId) {
        List<CartItem> cartItems = cartItemRepository.findByUserId(userId);
        return cartItems.stream()
                .map(CartItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
    
    private CartItemDTO convertToDTO(CartItem cartItem) {
        CartItemDTO dto = new CartItemDTO();
        dto.setId(cartItem.getId());
        dto.setUserId(cartItem.getUser().getId());
        dto.setProductId(cartItem.getProduct().getId());
        dto.setQuantity(cartItem.getQuantity());
        dto.setProductName(cartItem.getProduct().getName());
        dto.setUnitPrice(cartItem.getProduct().getPrice());
        dto.setTotalPrice(cartItem.getTotalPrice());
        return dto;
    }
}