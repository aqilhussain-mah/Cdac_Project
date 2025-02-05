package com.example.demo.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "food_items")
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_id")
    private Integer foodId;

    @Column(name = "food_item_name", length = 100)
    private String foodItemName;

    @Column(name = "food_item_type", length = 50)
    private String foodItemType;

    @ManyToOne
    @JoinColumn(name = "hall_id", referencedColumnName = "hall_id")
    private FunctionHall functionHall;

    // Constructors
    public FoodItem() {}

    public FoodItem(String foodItemName, String foodItemType, FunctionHall functionHall) {
        this.foodItemName = foodItemName;
        this.foodItemType = foodItemType;
        this.functionHall = functionHall;
    }

    // Getters and Setters
    public Integer getFoodId() {
        return foodId;
    }

    public void setFoodId(Integer foodId) {
        this.foodId = foodId;
    }

    public String getFoodItemName() {
        return foodItemName;
    }

    public void setFoodItemName(String foodItemName) {
        this.foodItemName = foodItemName;
    }

    public String getFoodItemType() {
        return foodItemType;
    }

    public void setFoodItemType(String foodItemType) {
        this.foodItemType = foodItemType;
    }

    public FunctionHall getFunctionHall() {
        return functionHall;
    }

    public void setFunctionHall(FunctionHall functionHall) {
        this.functionHall = functionHall;
    }
}
