package com.example.event.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    private int bookingId;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "dateId")
    private Dates dates;

    @ManyToOne
    @JoinColumn(name = "functionHallId")
    private FunctionHall functionHall;

    @ManyToOne
    @JoinColumn(name = "eventId")
    private EventTypes event;
}

