package com.example.event.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.event.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin,Integer> {

}
