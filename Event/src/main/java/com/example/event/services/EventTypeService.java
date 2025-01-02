package com.example.event.services;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.event.entity.EventTypes;
import com.example.event.repository.EventTypeRepository;

import java.util.List;

@Service
public class EventTypeService {

    @Autowired
    private EventTypeRepository eventTypeRepository;

    public EventTypes getEventTypeById(Integer eventId) {
        return eventTypeRepository.findById(eventId).orElse(null);
    }

    public EventTypes saveEventType(EventTypes eventType) {
        return eventTypeRepository.save(eventType);
    }

    public void deleteEventType(Integer eventId) {
        eventTypeRepository.deleteById(eventId);
    }

    public List<EventTypes> findAll() {
        return eventTypeRepository.findAll();
    }
}

