package com.dilmin.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CourseRequestDTO {

    @NotBlank(message = "Course name is required")
    private String courseName;

    @Size(max = 100, message = "Description must not exceed 100 characters")
    private String description;

    @NotBlank(message = "Duration is required")
    private String duration;

    @NotNull(message = "Fee is required")
    @Positive(message = "Fee must greater than zero")
    private BigDecimal fee;

    @NotBlank(message = "Status is required")
    private String status;
}
