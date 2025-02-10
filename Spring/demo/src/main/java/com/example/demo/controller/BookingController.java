package com.example.demo.controller;

import com.example.demo.Entity.Booking;
import com.example.demo.services.BookingService;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

	@Autowired
	private BookingService bookingService;

	@GetMapping("/user/{userId}")
	public ResponseEntity<?> getBookingsByUserId(@PathVariable Long userId) {
		List<Booking> bookings = bookingService.getBookingsByUserId(userId);

		if (bookings.isEmpty()) {
			return ResponseEntity.status(404).body("No bookings found for user ID: " + userId);
		}

		return ResponseEntity.ok(bookings);
	}

	@PostMapping("/create")
	public Booking createBooking(@RequestBody Map<String, Object> requestData) {
	    Long userId = null;
	    Long functionHallId = null;
	    int expectedGuests = 0;
	    String date = null;
	    String eventType = null;
	    Booking.BookingStatus bookingStatus = null;

	    // Check if values are present in the requestData map and parse accordingly
	    if (requestData.get("userId") != null) {
	        userId = Long.parseLong(requestData.get("userId").toString());
	    }

	    if (requestData.get("functionHallId") != null) {
	        functionHallId = Long.parseLong(requestData.get("functionHallId").toString());
	    }

	    if (requestData.get("expectedGuests") != null) {
	        expectedGuests = Integer.parseInt(requestData.get("expectedGuests").toString());
	    }

	    if (requestData.get("date") != null) {
	        date = requestData.get("date").toString();
	    }

	    if (requestData.get("eventType") != null) {
	        eventType = requestData.get("eventType").toString();
	    }

	    if (requestData.get("bookingStatus") != null) {
	        bookingStatus = Booking.BookingStatus.valueOf(requestData.get("bookingStatus").toString());
	    }

	    // Call the service to create the booking
	    return bookingService.createBooking(userId, functionHallId, expectedGuests, date, eventType, bookingStatus);
	}



}
