package com.dilmin.backend.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ApiErrorDTO {
    private String message;
    private int status;
    private String error;
    private String path;
    private LocalDateTime timestamp;
}
