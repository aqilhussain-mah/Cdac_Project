package com.example.event.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.event.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

}
