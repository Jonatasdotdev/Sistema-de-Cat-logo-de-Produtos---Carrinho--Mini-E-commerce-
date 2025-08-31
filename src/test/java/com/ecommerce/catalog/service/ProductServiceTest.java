package com.ecommerce.catalog.service;

import com.ecommerce.catalog.dto.ProductDTO;
import com.ecommerce.catalog.entity.Product;
import com.ecommerce.catalog.repository.ProductRepository;
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
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product product;
    private ProductDTO productDTO;

    @BeforeEach
    void setUp() {
        product = new Product("Notebook", new BigDecimal("2500.00"), "Notebook Dell");
        product.setId(1L);

        productDTO = new ProductDTO("Notebook", new BigDecimal("2500.00"), "Notebook Dell");
        productDTO.setId(1L);
    }

    @Test
    void getAllProducts_ShouldReturnListOfProductDTOs() {
        // Given
        List<Product> products = Arrays.asList(product);
        when(productRepository.findAll()).thenReturn(products);

        // When
        List<ProductDTO> result = productService.getAllProducts();

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(productDTO.getName(), result.get(0).getName());
        assertEquals(productDTO.getPrice(), result.get(0).getPrice());
        verify(productRepository, times(1)).findAll();
    }

    @Test
    void getProductById_WhenProductExists_ShouldReturnProductDTO() {
        // Given
        when(productRepository.findById(1L)).thenReturn(Optional.of(product));

        // When
        Optional<ProductDTO> result = productService.getProductById(1L);

        // Then
        assertTrue(result.isPresent());
        assertEquals(productDTO.getName(), result.get().getName());
        assertEquals(productDTO.getPrice(), result.get().getPrice());
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    void getProductById_WhenProductDoesNotExist_ShouldReturnEmpty() {
        // Given
        when(productRepository.findById(anyLong())).thenReturn(Optional.empty());

        // When
        Optional<ProductDTO> result = productService.getProductById(1L);

        // Then
        assertFalse(result.isPresent());
        verify(productRepository, times(1)).findById(1L);
    }

    @Test
    void createProduct_ShouldReturnCreatedProductDTO() {
        // Given
        when(productRepository.save(any(Product.class))).thenReturn(product);

        // When
        ProductDTO result = productService.createProduct(productDTO);

        // Then
        assertNotNull(result);
        assertEquals(productDTO.getName(), result.getName());
        assertEquals(productDTO.getPrice(), result.getPrice());
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void updateProduct_WhenProductExists_ShouldReturnUpdatedProductDTO() {
        // Given
        ProductDTO updatedDTO = new ProductDTO("Notebook Updated", new BigDecimal("3000.00"), "Updated description");
        Product updatedProduct = new Product("Notebook Updated", new BigDecimal("3000.00"), "Updated description");
        updatedProduct.setId(1L);

        when(productRepository.findById(1L)).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenReturn(updatedProduct);

        // When
        Optional<ProductDTO> result = productService.updateProduct(1L, updatedDTO);

        // Then
        assertTrue(result.isPresent());
        assertEquals(updatedDTO.getName(), result.get().getName());
        assertEquals(updatedDTO.getPrice(), result.get().getPrice());
        verify(productRepository, times(1)).findById(1L);
        verify(productRepository, times(1)).save(any(Product.class));
    }

    @Test
    void deleteProduct_WhenProductExists_ShouldReturnTrue() {
        // Given
        when(productRepository.existsById(1L)).thenReturn(true);

        // When
        boolean result = productService.deleteProduct(1L);

        // Then
        assertTrue(result);
        verify(productRepository, times(1)).existsById(1L);
        verify(productRepository, times(1)).deleteById(1L);
    }

    @Test
    void deleteProduct_WhenProductDoesNotExist_ShouldReturnFalse() {
        // Given
        when(productRepository.existsById(1L)).thenReturn(false);

        // When
        boolean result = productService.deleteProduct(1L);

        // Then
        assertFalse(result);
        verify(productRepository, times(1)).existsById(1L);
        verify(productRepository, never()).deleteById(anyLong());
    }

    @Test
    void searchProductsByName_ShouldReturnMatchingProducts() {
        // Given
        List<Product> products = Arrays.asList(product);
        when(productRepository.findByNameContainingIgnoreCase("Notebook")).thenReturn(products);

        // When
        List<ProductDTO> result = productService.searchProductsByName("Notebook");

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(productDTO.getName(), result.get(0).getName());
        verify(productRepository, times(1)).findByNameContainingIgnoreCase("Notebook");
    }
}