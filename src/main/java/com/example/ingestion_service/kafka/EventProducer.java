package com.example.ingestion_service.kafka;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.example.ingestion_service.dto.EventRequest;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EventProducer {
    
    private static final String TOPIC="events.ingest";

    private final KafkaTemplate<String,EventRequest> kafkaTemplate;

    public void sendEvent(EventRequest event){
        kafkaTemplate.send(TOPIC, event.getEventId(), event)
            .whenComplete((result, ex) -> {
                if (ex != null) {
                    System.err.println("Failed to send event: " + ex.getMessage());
                } else {
                    System.out.println("Event sent successfully to topic: " + TOPIC);
                }
            });
    }
}
