package com.example.demo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
		System.out.println("Server started");
	}

	// Fixed USERS list initialization to be mutable
	private static final List<Map<String, String>> USERS = new ArrayList<>(Arrays.asList(
		new HashMap<String, String>() {{
			put("username", "User");
			put("password", "user@123");
			put("role", "user");
		}},
		new HashMap<String, String>() {{
			put("username", "Admin");
			put("password", "admin@123");
			put("role", "admin");
		}}
	));

	@PostMapping("/login")
	public Map<String, Object> validateUser(@RequestBody Map<String, String> credentials) {
		String username = credentials.get("username");
		String password = credentials.get("password");
		System.out.println("Username:" + username + " Password:" + password);
		// Validate user credentials using the hardcoded list
		for (Map<String, String> user : USERS) {
			if (user.get("username").equals(username) && user.get("password").equals(password)) {
				return Map.of("success", true, "role", user.get("role")); // Return true and the role if matched
			}
		}
		return Map.of("success", false); // Return false if no match
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
	
	// Create a POST endpoint for resetPassword
	@PostMapping("/resetPassword")
	public Map<String, Object> resetPassword(@RequestBody Map<String, String> request) {
	    String username = request.get("username");
	    String newPassword = request.get("newPassword");

	    System.out.println("Username: " + username + " New Password: " + newPassword);

	    // Find the user and update the password
	    for (Map<String, String> user : USERS) {
	        if (user.get("username").equals(username)) {
	            user.put("password", newPassword); // Update password
	            return Map.of("success", true, "message", "Password updated successfully");
	        }
	    }

	    // If user not found, return failure response
	    return Map.of("success", false, "message", "User not found");
	}
	
	@PostMapping("/register")
	public Map<String, Object> registerUser(@RequestBody Map<String, String> userDetails) {
	    String email = userDetails.get("email");
	    String password = userDetails.get("password");
	    String role = userDetails.get("role");

	    // Create a new user map
	    Map<String, String> newUser = new HashMap<>();
	    newUser.put("username", email); // Using email as username
	    newUser.put("password", password);
	    newUser.put("role", role);

	    // Add the new user to the list (modifying a static list may not be ideal for production)
	    USERS.add(newUser);

	    System.out.println("New user registered: " + email +" role is :" + role);

	    return Map.of("success", true, "message", "User registered successfully");
	}

}