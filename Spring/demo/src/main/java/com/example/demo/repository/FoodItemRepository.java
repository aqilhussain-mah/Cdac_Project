package com.example.demo.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.FoodItem;

public interface FoodItemRepository extends JpaRepository<FoodItem, Integer> {
}

