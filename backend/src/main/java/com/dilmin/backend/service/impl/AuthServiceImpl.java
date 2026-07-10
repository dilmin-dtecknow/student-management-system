package com.dilmin.backend.service.impl;

import com.dilmin.backend.dto.request.LoginRequest;
import com.dilmin.backend.dto.request.RegisterRequestDTO;
import com.dilmin.backend.dto.response.AuthResponse;
import com.dilmin.backend.entity.User;
import com.dilmin.backend.enums.Role;
import com.dilmin.backend.repository.UserRepository;
import com.dilmin.backend.security.CustomUserDetails;
import com.dilmin.backend.security.CustomUserDetailsService;
import com.dilmin.backend.security.JwtService;
import com.dilmin.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtService jwtService;

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AuthResponse login(LoginRequest loginRequest) {

        authenticationManager.authenticate( //check user if exist in db
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );

        CustomUserDetails userDetails =
                (CustomUserDetails) customUserDetailsService
                        .loadUserByUsername(loginRequest.getEmail());

        User user = userDetails.getUser();

        String token = jwtService.generateToken(userDetails);

        return AuthResponse.builder()
                .token(token)
                .email(user.getEmail())
                .role(user.getRole().name())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }

    @Override
    public AuthResponse register(RegisterRequestDTO registerRequestDTO) {

        if (userRepository.existsByEmail(registerRequestDTO.getEmail())) {
            log.error("Email already exists");
            throw new RuntimeException("Email address already in use");
        }

        if (userRepository.existsByPhoneNumber(registerRequestDTO.getPhoneNumber())) {
            log.error("Phone number already exists");
            throw new RuntimeException("Phone number already in use");
        }

        User user = modelMapper.map(registerRequestDTO, User.class);
        user.setPassword(
                passwordEncoder.encode(registerRequestDTO.getPassword())
        );

        user.setRole(Role.STUDENT);
        user.setEnabled(true);

        User saveUser = userRepository.save(user);

        CustomUserDetails userDetails = new CustomUserDetails(saveUser);

        String token = jwtService.generateToken(userDetails);

        return AuthResponse.builder()
                .token(token)
                .email(saveUser.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole().name())
                .build();
    }
}
