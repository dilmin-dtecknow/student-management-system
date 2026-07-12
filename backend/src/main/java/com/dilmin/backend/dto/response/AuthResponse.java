package com.dilmin.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
public class AuthResponse {
    private UUID id;
    private String token;
    private String email;
    private String role;
    private String firstName;
    private String lastName;
}
