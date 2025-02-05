package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.FoodItem;
import com.example.demo.services.FoodItemService;

import java.util.List;

@RestController
@RequestMapping("/food-items")
public class FoodItemController {

    @Autowired
    private FoodItemService foodItemService;

    @GetMapping
    public List<FoodItem> getAllFoodItems() {
        return foodItemService.getAllFoodItems();
    }

    @GetMapping("/{id}")
    public ResponseEntity<FoodItem> getFoodItemById(@PathVariable Integer id) {
        FoodItem foodItem = foodItemService.getFoodItemById(id);
        return (foodItem != null) ? ResponseEntity.ok(foodItem) : ResponseEntity.notFound().build();
    }

    @PostMapping("/{hallId}")
    public ResponseEntity<FoodItem> addFoodItem(@RequestBody FoodItem foodItem, @PathVariable Integer hallId) {
        FoodItem savedItem = foodItemService.addFoodItem(foodItem, hallId);
        return (savedItem != null) ? ResponseEntity.ok(savedItem) : ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}/{hallId}")
    public ResponseEntity<FoodItem> updateFoodItem(
            @PathVariable Integer id,
            @PathVariable Integer hallId,
            @RequestBody FoodItem updatedFoodItem) {
        
        FoodItem foodItem = foodItemService.updateFoodItem(id, hallId, updatedFoodItem);
        return (foodItem != null) ? ResponseEntity.ok(foodItem) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodItem(@PathVariable Integer id) {
        foodItemService.deleteFoodItem(id);
        return ResponseEntity.noContent().build();
    }
}
