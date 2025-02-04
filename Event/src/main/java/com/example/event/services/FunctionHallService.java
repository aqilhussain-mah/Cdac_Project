package com.example.event.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.event.entity.FunctionHall;
import com.example.event.repository.FunctionHallRepository;

import java.util.List;

@Service
public class FunctionHallService {

    @Autowired
    private FunctionHallRepository functionHallRepository;

    public FunctionHall getFunctionHallById(Integer functionHallId) {
        return functionHallRepository.findById(functionHallId).orElse(null);
    }

    public FunctionHall saveFunctionHall(FunctionHall functionHall) {
        return functionHallRepository.save(functionHall);
    }

    public void deleteFunctionHall(Integer functionHallId) {
        functionHallRepository.deleteById(functionHallId);
    }

    public List<FunctionHall> findAll() {
        return functionHallRepository.findAll();
    }
}

