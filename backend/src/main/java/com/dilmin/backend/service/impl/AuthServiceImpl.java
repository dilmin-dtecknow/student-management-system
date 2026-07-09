package com.dilmin.backend.service.impl;

import com.dilmin.backend.dto.request.LoginRequest;
import com.dilmin.backend.dto.response.AuthResponse;
import com.dilmin.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {
    @Override
    public AuthResponse login(LoginRequest loginRequest) {
        return null;
    }
}
