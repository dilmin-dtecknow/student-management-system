package com.dilmin.backend.dto;

import com.dilmin.backend.enums.CourseStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CourseDTO {
    private UUID id;
    private String courseName;
    private String description;
    private String duration;
    private BigDecimal fee;
    private CourseStatus status;
}
