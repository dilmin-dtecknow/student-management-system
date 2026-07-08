package com.dilmin.backend.dto.response;

import com.dilmin.backend.enums.CourseStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
public class CourseResponseDTO {
    private UUID id;
    private String courseName;
    private String description;
    private String duration;
    private BigDecimal fee;
    private CourseStatus status;
    private LocalDateTime createdAt;
}
