package com.ecommerce.catalog.service;

import com.ecommerce.catalog.dto.CartItemDTO;
import com.ecommerce.catalog.entity.CartItem;
import com.ecommerce.catalog.entity.Product;
import com.ecommerce.catalog.entity.User;
import com.ecommerce.catalog.repository.CartItemRepository;
import com.ecommerce.catalog.repository.ProductRepository;
import com.ecommerce.catalog.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CartServiceTest {

    @Mock
    private CartItemRepository cartItemRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private CartService cartService;

    private User user;
    private Product product;
    private CartItem cartItem;
    private CartItemDTO cartItemDTO;

    @BeforeEach
    void setUp() {
        user = new User("João Silva", "joao@email.com");
        user.setId(1L);

        product = new Product("Notebook", new BigDecimal("2500.00"), "Notebook Dell");
        product.setId(1L);

        cartItem = new CartItem(user, product, 2);
        cartItem.setId(1L);

        cartItemDTO = new CartItemDTO(1L, 1L, 2);
        cartItemDTO.setId(1L);
    }

    @Test
    void getCartItems_ShouldReturnListOfCartItemDTOs() {
        // Given
        List<CartItem> cartItems = Arrays.asList(cartItem);
        when(cartItemRepository.findByUserId(1L)).thenReturn(cartItems);

        // When
        List<CartItemDTO> result = cartService.getCartItems(1L);

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(cartItemDTO.getUserId(), result.get(0).getUserId());
        assertEquals(cartItemDTO.getProductId(), result.get(0).getProductId());
        assertEquals(cartItemDTO.getQuantity(), result.get(0).getQuantity());
        verify(cartItemRepository, times(1)).findByUserId(1L);
    }

    @Test
    void addToCart_WhenNewItem_ShouldCreateNewCartItem() {
        // Given
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(cartItemRepository.findByUserAndProduct(user, product)).thenReturn(Optional.empty());
        when(cartItemRepository.save(any(CartItem.class))).thenReturn(cartItem);

        // When
        CartItemDTO result = cartService.addToCart(cartItemDTO);

        // Then
        assertNotNull(result);
        assertEquals(cartItemDTO.getUserId(), result.getUserId());
        assertEquals(cartItemDTO.getProductId(), result.getProductId());
        verify(cartItemRepository, times(1)).save(any(CartItem.class));
    }

    @Test
    void addToCart_WhenItemExists_ShouldUpdateQuantity() {
        // Given
        CartItem existingItem = new CartItem(user, product, 1);
        existingItem.setId(1L);
        
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(cartItemRepository.findByUserAndProduct(user, product)).thenReturn(Optional.of(existingItem));
        when(cartItemRepository.save(any(CartItem.class))).thenReturn(existingItem);

        // When
        CartItemDTO result = cartService.addToCart(cartItemDTO);

        // Then
        assertNotNull(result);
        assertEquals(3, existingItem.getQuantity()); // 1 + 2
        verify(cartItemRepository, times(1)).save(existingItem);
    }

    @Test
    void addToCart_WhenUserNotFound_ShouldThrowException() {
        // Given
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        // When & Then
        RuntimeException exception = assertThrows(RuntimeException.class, 
            () -> cartService.addToCart(cartItemDTO));
        
        assertEquals("Usuário não encontrado", exception.getMessage());
        verify(cartItemRepository, never()).save(any(CartItem.class));
    }

    @Test
    void removeFromCart_WhenItemExists_ShouldReturnTrue() {
        // Given
        when(cartItemRepository.existsById(1L)).thenReturn(true);

        // When
        boolean result = cartService.removeFromCart(1L);

        // Then
        assertTrue(result);
        verify(cartItemRepository, times(1)).existsById(1L);
        verify(cartItemRepository, times(1)).deleteById(1L);
    }

    @Test
    void getCartTotal_ShouldReturnCorrectTotal() {
        // Given
        List<CartItem> cartItems = Arrays.asList(cartItem);
        when(cartItemRepository.findByUserId(1L)).thenReturn(cartItems);

        // When
        BigDecimal result = cartService.getCartTotal(1L);

        // Then
        assertEquals(new BigDecimal("5000.00"), result); // 2500 * 2
        verify(cartItemRepository, times(1)).findByUserId(1L);
    }

    @Test
    void clearCart_ShouldDeleteAllUserCartItems() {
        // When
        cartService.clearCart(1L);

        // Then
        verify(cartItemRepository, times(1)).deleteByUserId(1L);
    }
}