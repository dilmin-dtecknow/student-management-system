package com.dilmin.backend.service;

import com.dilmin.backend.dto.response.UserResponseDTO;
import com.dilmin.backend.entity.Student;
import com.dilmin.backend.entity.User;

import java.util.List;
import java.util.UUID;

public interface UserService {
    User saveUser(User user);

    List<UserResponseDTO> getUsers();

    User getUserById(UUID id);

    User updateUser(UUID id, User user);

    void deleteUser(UUID id);
}
