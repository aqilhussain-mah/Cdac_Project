package com.example.event.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.event.entity.Food;

public interface FoodRepository extends JpaRepository<Food, Integer> {

}
