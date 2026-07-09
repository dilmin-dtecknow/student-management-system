package com.dilmin.backend.security;

import org.springframework.security.core.userdetails.UserDetails;

public interface TokenService {

    String generateToken(UserDetails userDetails);
    String extractUsername(String token);
    boolean isTokenValid(String token, UserDetails userDetails);
    String extractRole(String token);
}
