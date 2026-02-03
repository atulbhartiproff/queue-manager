package com.example.ingestion_service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ingestion_service.dto.EventRequest;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/events")
public class EventController {
    
    @PostMapping
    public ResponseEntity<Void> ingestEvent(
        @Valid @RequestBody EventRequest eventRequest
    ){
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
}
