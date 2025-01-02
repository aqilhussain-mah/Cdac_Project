package com.example.event.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.event.entity.FunctionEvent;

@Repository
public interface FunctionEventRepository extends JpaRepository<FunctionEvent, Integer> {
    // Additional query methods can be defined here
}

