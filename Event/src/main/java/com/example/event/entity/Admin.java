package com.example.event.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "admin")
public class Admin {
    @Id
    private int adminId;

    private String adminName;
    private String adminEmail;
    private Long adminPhnNumber;
    private String adminPassword;

    @Enumerated(EnumType.STRING)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "functionHallId")
    private FunctionHall functionHall;

    public enum Role {
        USER, ADMIN
    }
}
