package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.FoodItem;
import com.example.demo.Entity.FunctionHall;
import com.example.demo.repository.FoodItemRepository;
import com.example.demo.repository.FunctionHallRepository;

import java.util.List;

import java.util.Optional;

@Service
public class FoodItemService {

    @Autowired
    private FoodItemRepository foodItemRepository;

    @Autowired
    private FunctionHallRepository functionHallRepository;

    public List<FoodItem> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

    public FoodItem getFoodItemById(Integer id) {
        return foodItemRepository.findById(id).orElse(null);
    }

    public FoodItem addFoodItem(FoodItem foodItem, Integer hallId) {
        FunctionHall hall = functionHallRepository.findById(hallId).orElse(null);
        if (hall != null) {
            foodItem.setFunctionHall(hall);
            return foodItemRepository.save(foodItem);
        }
        return null;
    }

    public FoodItem updateFoodItem(Integer id, Integer hallId, FoodItem updatedFoodItem) {
        Optional<FoodItem> existingFoodItem = foodItemRepository.findById(id);
        Optional<FunctionHall> functionHall = functionHallRepository.findById(hallId);

        if (existingFoodItem.isPresent() && functionHall.isPresent()) {
            FoodItem foodItem = existingFoodItem.get();
            foodItem.setFoodItemName(updatedFoodItem.getFoodItemName());
            foodItem.setFoodItemType(updatedFoodItem.getFoodItemType());
            foodItem.setFunctionHall(functionHall.get());

            return foodItemRepository.save(foodItem);
        }
        return null;
    }

    public void deleteFoodItem(Integer id) {
        foodItemRepository.deleteById(id);
    }
}
