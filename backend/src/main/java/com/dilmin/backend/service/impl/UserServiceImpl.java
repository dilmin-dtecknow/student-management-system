package com.dilmin.backend.service.impl;

import com.dilmin.backend.dto.response.UserResponseDTO;
import com.dilmin.backend.entity.User;
import com.dilmin.backend.exception.DuplicateResourceException;
import com.dilmin.backend.repository.UserRepository;
import com.dilmin.backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private  final PasswordEncoder passwordEncoder;

    @Override
    public User saveUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            log.error("Email already exists");
            throw new DuplicateResourceException("Email address already in use");
        }

        if (userRepository.existsByPhoneNumber(user.getPhoneNumber())) {
            log.error("Phone number already exists");
            throw new RuntimeException("Phone number already in use");
        }

        user.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        return userRepository.save(user);
    }

    @Override
    public List<UserResponseDTO> getUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(user -> modelMapper.map(user, UserResponseDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public User getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public User updateUser(UUID id, User user) {
        User existing = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));

        if (!existing.getEmail().equals(user.getEmail()) && userRepository.existsByEmail(user.getEmail())) {
            log.error("Email already exists");
            throw new DuplicateResourceException("Email address already in use");
        }

        if (!Objects.equals(existing.getPhoneNumber(), user.getPhoneNumber()) && userRepository.existsByPhoneNumber(user.getPhoneNumber())) {
            log.error("Phone number already exists");
            throw new RuntimeException("Phone number already in use");
        }

        existing.setFirstName(user.getFirstName());
        existing.setLastName(user.getLastName());
        existing.setEmail(user.getEmail());
        existing.setPhoneNumber(user.getPhoneNumber());

        if (user.getPassword() != null && !user.getPassword().isBlank()) {
            existing.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        existing.setRole(user.getRole());
        existing.setEnabled(user.getEnabled() != null ? user.getEnabled() : existing.getEnabled());

        return userRepository.save(existing);
    }

    @Override
    public void deleteUser(UUID id) {
        User existing = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(existing);
    }
}
