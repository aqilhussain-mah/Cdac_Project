package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Entity.FunctionHall;

import java.util.List;

@Repository
public interface FunctionHallRepository extends JpaRepository<FunctionHall, Integer> {
    List<FunctionHall> findByState(String state); // Find halls by state
    List<FunctionHall> findByAdmin_Id(long adminId); // Find halls by adminId
}