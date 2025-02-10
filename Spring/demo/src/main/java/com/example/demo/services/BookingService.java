package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.Entity.Booking;
import com.example.demo.Entity.FunctionHall;
import com.example.demo.Entity.Users;
import com.example.demo.repository.BookingRepository;
import com.example.demo.repository.FunctionHallRepository;
import com.example.demo.repository.UsersRepository;
import java.time.LocalDate;
import java.util.List;

@Service
public class BookingService {

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	private FunctionHallRepository functionHallRepository;

	@Autowired
	private UsersRepository usersRepository;

	public List<Booking> getBookingsByUserId(Long userId) {
		return bookingRepository.findByUserId(userId);
	}

	public Booking createBooking(Long userId, Long functionHallId, int expectedGuests, String date, String eventType,
			Booking.BookingStatus bookingStatus) {
		try {
			// Fetch Function Hall
			FunctionHall functionHall = functionHallRepository.findById(functionHallId)
					.orElseThrow(() -> new RuntimeException("Function Hall not found with ID: " + functionHallId));

			// Fetch User details
			Users user = usersRepository.findById(userId)
					.orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

			if (expectedGuests <= 0) {
				throw new RuntimeException("Expected guests must be a positive number");
			}

			LocalDate parsedDate = LocalDate.parse(date);

			// Create and populate the Booking object
			Booking booking = new Booking();
			booking.setUser(user);
			booking.setFunctionHall(functionHall);
			booking.setExpectedGuests(expectedGuests);
			booking.setDate(LocalDate.parse(date)); // Convert string to LocalDate
			booking.setEventType(eventType);
			booking.setBookingStatus(bookingStatus);

			// Save and return the booking
			return bookingRepository.save(booking);
		} catch (RuntimeException e) {
			// You could log the exception here or return a custom error response
			throw new RuntimeException("Error creating booking: " + e.getMessage());
		}
	}
}
