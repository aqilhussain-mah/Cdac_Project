package com.example.event.services;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.event.entity.FunctionEvent;
import com.example.event.repository.FunctionEventRepository;

import java.util.List;

@Service
public class FunctionEventService {

    @Autowired
    private FunctionEventRepository functionEventRepository;

    public FunctionEvent getFunctionEventById(Integer id) {
        return functionEventRepository.findById(id).orElse(null);
    }

    public FunctionEvent saveFunctionEvent(FunctionEvent functionEvent) {
        return functionEventRepository.save(functionEvent);
    }

    public void deleteFunctionEvent(Integer id) {
        functionEventRepository.deleteById(id);
    }

    public List<FunctionEvent> findAll() {
        return functionEventRepository.findAll();
    }
}
