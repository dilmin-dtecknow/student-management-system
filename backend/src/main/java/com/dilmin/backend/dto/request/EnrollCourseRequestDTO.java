package com.dilmin.backend.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.util.Set;
import java.util.UUID;

@Data
public class EnrollCourseRequestDTO {
    @NotEmpty(message = "Select at least one course")
    private Set<UUID> courseIds;
}
