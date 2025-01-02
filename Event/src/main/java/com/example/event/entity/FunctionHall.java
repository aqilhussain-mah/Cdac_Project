package com.example.event.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "function_hall")  // Specify the table name here
public class FunctionHall {

    @Id
    
    @Column(name = "function_hall_id")
    private int functionHallId;

    @Column(name = "function_hall_name")
    private String functionHallName;

    @Column(name = "function_hall_address")
    private String functionHallAddress;

    @Column(name = "function_hall_capacity")
    private String functionHallCapacity;
}

