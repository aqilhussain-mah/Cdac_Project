package com.example.event.repository;

import java.sql.Date;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.event.entity.Dates;

public interface DateRepository extends JpaRepository<Dates, Integer>{

	Date save(Date date);

}
