package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.FunctionHall;
import com.example.demo.Entity.Users;
import com.example.demo.services.FunctionHallService;
import com.example.demo.services.UsersService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/functionhalls")
@CrossOrigin(origins = "http://localhost:5173") // Frontend allowed to access
public class FunctionHallController {

	@Autowired
	private FunctionHallService functionHallService;

	@Autowired
	private UsersService userService;

	// Get function halls by state
	@GetMapping("/state/{state}")
	public ResponseEntity<List<Map<String, String>>> getFunctionHallsByState(@PathVariable String state) {
		List<Map<String, String>> halls = functionHallService.getFunctionHallsByState(state).stream()
				.map(hall -> Map.of("id", String.valueOf(hall.getHallId()), "name", hall.getHallName(), "state",
						hall.getState(), "location", hall.getLocation(), "admin", hall.getAdmin().getUsername()))
				.collect(Collectors.toList());
		return ResponseEntity.ok(halls);
	}

	@GetMapping("/{hallId}/details")
	public ResponseEntity<Map<String, Object>> getFunctionHallDetails(@PathVariable int hallId) {
		FunctionHall hall = functionHallService.getFunctionHallDetails(hallId);
		if (hall == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Function hall not found"));
		}

		Users admin = hall.getAdmin(); // Get admin details

		// Create response with additional admin details
		Map<String, Object> response = new HashMap<>();
		response.put("state", hall.getState());
		response.put("name", hall.getHallName());
		response.put("location", hall.getLocation());

		if (admin != null) {
			response.put("adminId", admin.getId());
			response.put("adminName", admin.getFirstName());
			response.put("adminContact", admin.getMobile());
		} else {
			response.put("admin", "No admin assigned");
		}

		return ResponseEntity.ok(response);
	}

	// Add a new function hall (including adminId)
	@PostMapping("/add")
	public ResponseEntity<Map<String, String>> addFunctionHall(@RequestParam String state, @RequestParam String name,
			@RequestParam String location, @RequestParam int adminId) {
		try {
			FunctionHall addedHall = functionHallService.addFunctionHall(state, name, location, adminId);
			return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("id", String.valueOf(addedHall.getHallId())));
		} catch (IllegalArgumentException e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
		}
	}

	// Get all function halls
	@GetMapping("/list")
	public ResponseEntity<List<Map<String, String>>> getAllFunctionHalls() {
		List<FunctionHall> allHalls = functionHallService.getAllFunctionHalls();
		List<Map<String, String>> hallList = allHalls
				.stream().map(hall -> Map.of("id", String.valueOf(hall.getHallId()), "name", hall.getHallName(),
						"location", hall.getLocation(), "admin", hall.getAdmin().getUsername()))
				.collect(Collectors.toList());
		return ResponseEntity.ok(hallList);
	}

	// Search function halls by term (hall name, location, or state)
	@GetMapping("/search")
	public ResponseEntity<List<Map<String, Object>>> searchFunctionHalls(@RequestParam String query) {
		List<Map<String, Object>> result = functionHallService.searchFunctionHalls(query);
		return ResponseEntity.ok(result);
	}

	// Get function halls by adminId
	@GetMapping("/admin/{adminId}")
	public ResponseEntity<List<Map<String, String>>> getFunctionHallsByAdmin(@PathVariable long adminId) {
		List<Map<String, String>> halls = functionHallService
				.getFunctionHallsByAdminId(adminId).stream().map(hall -> Map.of("id", String.valueOf(hall.getHallId()),
						"name", hall.getHallName(), "state", hall.getState(), "location", hall.getLocation()))
				.collect(Collectors.toList());
		return ResponseEntity.ok(halls);
	}
	
	@DeleteMapping("/{hallId}")
    public ResponseEntity<Map<String, String>> deleteFunctionHall(@PathVariable int hallId) {
        try {
            functionHallService.deleteFunctionHall(hallId); // Delegate deletion to service
            return ResponseEntity.ok(Map.of("message", "Function hall deleted successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Function hall not found"));
        }
    }

//	@PutMapping("/update")
//	public ResponseEntity<String> updateFunctionHallAndAdminDetails(
//			@RequestBody FunctionHall updateRequest) {
//		try {	
//			// Update Function Hall details
//			FunctionHall updatedFunctionHall = functionHallService.updateFunctionHall(updateRequest.getFunctionHall());
//
//			// Update Admin details (User details)
//			userService.updateUserDetails(updateRequest.getAdmin());
//
//			return ResponseEntity.ok("Function Hall and Admin details updated successfully");
//		} catch (Exception e) {
//			return ResponseEntity.status(400).body("Error updating details: " + e.getMessage());
//		}
//	}

}
