package com.example.event.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.event.entity.Food;
import com.example.event.repository.FoodRepository;

import java.util.List;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    public Food getFoodById(Integer foodId) {
        return foodRepository.findById(foodId).orElse(null);
    }

    public Food saveFood(Food food) {
        return foodRepository.save(food);
    }

    public void deleteFood(Integer foodId) {
        foodRepository.deleteById(foodId);
    }

    public List<Food> findAll() {
        return foodRepository.findAll();
    }
}
