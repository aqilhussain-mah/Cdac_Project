package com.example.event.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.event.entity.FunctionHall;
import com.example.event.entity.FunctionHallFood;

public interface FunctionHallRepository extends JpaRepository<FunctionHall, Integer> {

	 }

