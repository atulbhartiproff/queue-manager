package com.example.ingestion_service.dto;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Map;

@Data
public class EventRequest {
    @NotBlank
    @JsonProperty("event_id")
    private String eventId;
    
    @NotBlank
    private String type;

    @NotNull
    private Instant timestamp;

    @NotNull
    private Map<String,Object> payload;
}
