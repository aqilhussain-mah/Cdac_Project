package com.example.event.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Food {
    @Id
    private int foodId;

    private String foodItemName;

    @Enumerated(EnumType.STRING)
    private FoodType foodItemType;

    private String foodcol;

    public enum FoodType {
        VEG, NON_VEG
    }
}

