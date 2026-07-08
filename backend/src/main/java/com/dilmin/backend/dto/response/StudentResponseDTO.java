package com.dilmin.backend.dto.response;

import com.dilmin.backend.enums.Gender;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@Builder
public class StudentResponseDTO {
    private UUID id;
    private UUID userId;
    private String fullName;
    private String address;
    private Gender gender;
    private Set<String> courses;
    private LocalDateTime createdAt;
}
