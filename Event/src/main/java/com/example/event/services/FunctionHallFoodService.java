package com.example.event.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.event.entity.FunctionHallFood;
import com.example.event.repository.FunctionHallFoodRepository;

import java.util.List;

@Service
public class FunctionHallFoodService {

    @Autowired
    private FunctionHallFoodRepository functionHallFoodRepository;

    public FunctionHallFood getFunctionHallFoodById(Integer id) {
        return functionHallFoodRepository.findById(id).orElse(null);
    }

    public FunctionHallFood saveFunctionHallFood(FunctionHallFood functionHallFood) {
        return functionHallFoodRepository.save(functionHallFood);
    }

    public void deleteFunctionHallFood(Integer id) {
        functionHallFoodRepository.deleteById(id);
    }

    public List<FunctionHallFood> findAll() {
        return functionHallFoodRepository.findAll();
    }
}

