package com.ecommerce.catalog.service;

import com.ecommerce.catalog.dto.UserDTO;
import com.ecommerce.catalog.entity.User;
import com.ecommerce.catalog.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User user;
    private UserDTO userDTO;

    @BeforeEach
    void setUp() {
        user = new User("João Silva", "joao@email.com");
        user.setId(1L);

        userDTO = new UserDTO("João Silva", "joao@email.com");
        userDTO.setId(1L);
    }

    @Test
    void getAllUsers_ShouldReturnListOfUserDTOs() {
        // Given
        List<User> users = Arrays.asList(user);
        when(userRepository.findAll()).thenReturn(users);

        // When
        List<UserDTO> result = userService.getAllUsers();

        // Then
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(userDTO.getName(), result.get(0).getName());
        assertEquals(userDTO.getEmail(), result.get(0).getEmail());
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void getUserById_WhenUserExists_ShouldReturnUserDTO() {
        // Given
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        // When
        Optional<UserDTO> result = userService.getUserById(1L);

        // Then
        assertTrue(result.isPresent());
        assertEquals(userDTO.getName(), result.get().getName());
        assertEquals(userDTO.getEmail(), result.get().getEmail());
        verify(userRepository, times(1)).findById(1L);
    }

    @Test
    void createUser_WhenEmailIsUnique_ShouldReturnCreatedUserDTO() {
        // Given
        when(userRepository.existsByEmail(userDTO.getEmail())).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(user);

        // When
        UserDTO result = userService.createUser(userDTO);

        // Then
        assertNotNull(result);
        assertEquals(userDTO.getName(), result.getName());
        assertEquals(userDTO.getEmail(), result.getEmail());
        verify(userRepository, times(1)).existsByEmail(userDTO.getEmail());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void createUser_WhenEmailAlreadyExists_ShouldThrowException() {
        // Given
        when(userRepository.existsByEmail(userDTO.getEmail())).thenReturn(true);

        // When & Then
        RuntimeException exception = assertThrows(RuntimeException.class, 
            () -> userService.createUser(userDTO));
        
        assertEquals("Email já está em uso", exception.getMessage());
        verify(userRepository, times(1)).existsByEmail(userDTO.getEmail());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void updateUser_WhenUserExists_ShouldReturnUpdatedUserDTO() {
        // Given
        UserDTO updatedDTO = new UserDTO("João Santos", "joao.santos@email.com");
        User updatedUser = new User("João Santos", "joao.santos@email.com");
        updatedUser.setId(1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(userRepository.existsByEmail(updatedDTO.getEmail())).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(updatedUser);

        // When
        Optional<UserDTO> result = userService.updateUser(1L, updatedDTO);

        // Then
        assertTrue(result.isPresent());
        assertEquals(updatedDTO.getName(), result.get().getName());
        assertEquals(updatedDTO.getEmail(), result.get().getEmail());
        verify(userRepository, times(1)).findById(1L);
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void deleteUser_WhenUserExists_ShouldReturnTrue() {
        // Given
        when(userRepository.existsById(1L)).thenReturn(true);

        // When
        boolean result = userService.deleteUser(1L);

        // Then
        assertTrue(result);
        verify(userRepository, times(1)).existsById(1L);
        verify(userRepository, times(1)).deleteById(1L);
    }

    @Test
    void getUserByEmail_WhenUserExists_ShouldReturnUserDTO() {
        // Given
        when(userRepository.findByEmail("joao@email.com")).thenReturn(Optional.of(user));

        // When
        Optional<UserDTO> result = userService.getUserByEmail("joao@email.com");

        // Then
        assertTrue(result.isPresent());
        assertEquals(userDTO.getName(), result.get().getName());
        assertEquals(userDTO.getEmail(), result.get().getEmail());
        verify(userRepository, times(1)).findByEmail("joao@email.com");
    }
}