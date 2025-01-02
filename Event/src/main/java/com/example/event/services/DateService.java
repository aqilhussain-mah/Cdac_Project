package com.example.event.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.event.entity.Dates;
import com.example.event.repository.DateRepository;

import java.sql.Date;
import java.util.List;

@Service
public class DateService {

    @Autowired
    private DateRepository dateRepository;

    public Dates getDateById(Integer dateId) {
        return dateRepository.findById(dateId).orElse(null);
    }

    public Date saveDate(Date date) {
        return dateRepository.save(date);
    }

    public void deleteDate(Integer dateId) {
        dateRepository.deleteById(dateId);
    }

    public List<Dates> findAll() {
        return dateRepository.findAll();
    }
}

