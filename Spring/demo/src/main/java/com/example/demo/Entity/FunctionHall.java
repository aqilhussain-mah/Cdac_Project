package com.example.demo.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "function_halls")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FunctionHall {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hall_id")
    private int hallId;

    @Column(name = "hall_name", nullable = false)
    private String hallName;

    @Column(name = "location", nullable = false)
    private String location;

    @Column(name = "state", nullable = false) // This is now a String
    private String state;

    @ManyToOne
    @JoinColumn(name = "admin_id", referencedColumnName = "id") 
    @JsonIgnoreProperties({"functionHalls", "password"}) 
    private Users admin;

    // Constructor for creating a FunctionHall with state as a String
    public FunctionHall(String hallName, String location, String state, Users admin) {
        this.hallName = hallName;
        this.location = location;
        this.state = state;
        this.admin = admin;
    }
}
