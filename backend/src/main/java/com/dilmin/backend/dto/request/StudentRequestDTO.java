package com.dilmin.backend.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
public class StudentRequestDTO {

    @NotNull(message = "User Id required")
    private UUID userId;

    @Size(max = 100, message = "Address must not exceed 100 characters")
    private String address;

    @NotNull(message = "Gender is required")
    private String gender;

    private Set<UUID> courseIds; //optional
}
