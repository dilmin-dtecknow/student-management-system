package com.dilmin.backend.dto.response;

import com.dilmin.backend.dto.CourseDTO;
import com.dilmin.backend.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentResponseDTO {
    private UUID id;
    private UUID userId;
    private String firstName;
    private String lastName;
    private String address;
    private String email;
    private String phoneNumber;
    private Gender gender;
    private Set<CourseDTO> courses;
    private LocalDateTime createdAt;
}
