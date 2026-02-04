package com.example.ingestion_service.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.ingestion_service.dto.EventRequest;
import com.example.ingestion_service.kafka.EventProducer;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {
    
    private final EventProducer eventProducer;

    @PostMapping
    public ResponseEntity<Void> ingestEvent(
        @Valid @RequestBody EventRequest eventRequest
    ){
        eventProducer.sendEvent(eventRequest);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }
}
