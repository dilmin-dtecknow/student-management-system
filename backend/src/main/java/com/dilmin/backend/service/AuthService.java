package com.dilmin.backend.service;

import com.dilmin.backend.dto.request.LoginRequest;
import com.dilmin.backend.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse login(LoginRequest loginRequest);
}
