package com.example.demo.controller;

import java.util.ArrayList;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.Users;
import com.example.demo.services.UsersService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:5173") // Ensure CORS is enabled
public class UsersController {

	@Autowired
	private UsersService userService;

	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody Users loginRequest) {
		Optional<Users> user = userService.findByUsername(loginRequest.getUsername());

		if (user.isPresent() && loginRequest.getPassword().equals(user.get().getPassword())) { // Simple password check
			// Authentication succeeded, return the role of the user
			return ResponseEntity.ok(Map.of("role", user.get().getRole().toString().toLowerCase(), "firstname",
					user.get().getFirstName(), "success", true));
		} else {
			// Authentication failed
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
		}
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody Users user) {
		try {
			System.out.println("First name:"+user.getFirstName()+" Last name :"+user.getLastName());
			Optional<Users> existingUser = userService.findByUsername(user.getUsername());

			if (existingUser.isPresent()) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST)
						.body(Map.of("error", "Username already exists. Please choose a different one."));
			}
			userService.createUser(user);
			return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "User registered successfully"));
		} catch (Exception e) { // Catch potential exceptions (e.g., duplicate username)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST)
					.body(Map.of("error", "Failed to register user: " + e.getMessage()));
		}
	}

	private static final List<String> STATES = Arrays.asList("Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
			"Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala",
			"Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
			"Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
			"Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep",
			"Delhi", "Puducherry");

	// GET endpoint to return list of states
	@GetMapping("/states")
	public Map<String, Object> getStates() {
		return Map.of("states", STATES); // Return the list of states wrapped in a "states" key
	}

	private static final Map<String, List<Map<String, String>>> functionHalls = new HashMap<>();

	static {
		functionHalls.put("Andhra Pradesh", Arrays.asList(createHall("Sree Function Hall", "Hyderabad"),
				createHall("Shree Marriages", "Visakhapatnam"), createHall("Royal Function Palace", "Vijayawada"),
				createHall("Lakshmi Kalyana Mandapam", "Guntur"), createHall("Sri Venkateshwara Hall", "Tirupati")));
		functionHalls.put("Tamil Nadu", Arrays.asList(createHall("Chennai Wedding Hall", "Chennai"),
				createHall("Kumar's Banquet", "Coimbatore")));
		functionHalls.put("Telangana", Arrays.asList(createHall("Hyderabad Grand Hall", "Hyderabad"),
				createHall("Raj Function Plaza", "Warangal")));
	}

// Static variable to generate unique IDs
	private static int hallIdCounter = 1;

// Modified createHall method to generate unique IDs
	private static Map<String, String> createHall(String name, String location) {
		Map<String, String> hall = new HashMap<>();
		hall.put("id", String.valueOf(hallIdCounter++)); // Auto-increment ID
		hall.put("name", name);
		hall.put("location", location);
		return hall;
	}

// Endpoint to fetch function halls by state
	@GetMapping("/functionHalls/{state}")
	public Map<String, Object> getFunctionHallsByState(@PathVariable String state) {
		System.out.println(state);
		List<Map<String, String>> halls = functionHalls.getOrDefault(state, new ArrayList<>());
		return Map.of("functionHalls", halls);
	}

// Endpoint to fetch details of a specific function hall by state and hallId
	@GetMapping("/functionHallDetails/{state}/{hallId}")
	public Map<String, Object> getFunctionHallDetails(@PathVariable String state, @PathVariable int hallId) {
		System.out.println("Fetching details for Hall ID: " + hallId + " in state: " + state);

		List<Map<String, String>> halls = functionHalls.getOrDefault(state, new ArrayList<>());

		// Find the hall with the matching ID in the list of halls for that state
		for (Map<String, String> hall : halls) {
			if (Integer.parseInt(hall.get("id")) == hallId) {
				// Return the details of the matching hall
				return Map.of("functionHall", hall);
			}
		}

		// Return a message if hall is not found
		return Map.of("error", "Function hall not found");

	}
}