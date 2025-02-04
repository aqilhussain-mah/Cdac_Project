package com.example.event.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.event.entity.EventTypes;

public interface EventTypeRepository extends JpaRepository<EventTypes, Integer> {

}
