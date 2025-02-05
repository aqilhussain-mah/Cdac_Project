package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.FunctionHall;
import com.example.demo.services.FunctionHallService;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/functionhalls")
public class FunctionHallController {

    @Autowired
    private FunctionHallService functionHallService;

    // Get function halls by state
    @GetMapping("/state/{state}")
    public ResponseEntity<List<Map<String, String>>> getFunctionHallsByState(@PathVariable String state) {
        List<Map<String, String>> halls = functionHallService.getFunctionHallsByState(state).stream()
                .map(hall -> Map.of(
                        "id", String.valueOf(hall.getHallId()),
                        "name", hall.getHallName(),
                        "state", hall.getState(),
                        "location", hall.getLocation(),
                        "admin", hall.getAdmin().getUsername()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(halls);
    }

    // Get function hall details by state and hallId
    @GetMapping("/{hallId}/details")
    public ResponseEntity<Map<String, String>> getFunctionHallDetails(@PathVariable int hallId) {
        FunctionHall hall = functionHallService.getFunctionHallDetails(hallId);
        if (hall == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("error", "Function hall not found"));
        }
        System.out.println("________________________________");
        System.out.println(hall);
        return ResponseEntity.ok(Map.of(
                "name", hall.getHallName(),
                "location", hall.getLocation(),
                "admin", hall.getAdmin().getUsername()
        ));
    }

    // Add a new function hall (including adminId)
    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> addFunctionHall(@RequestParam String state,
                                                               @RequestParam String name,
                                                               @RequestParam String location,
                                                               @RequestParam int adminId) {
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
        List<Map<String, String>> hallList = allHalls.stream()
                .map(hall -> Map.of(
                        "id", String.valueOf(hall.getHallId()),
                        "name", hall.getHallName(),
                        "location", hall.getLocation(),
                        "admin", hall.getAdmin().getUsername()
                ))
                .collect(Collectors.toList());
        return ResponseEntity.ok(hallList);
    }

    // Search function halls by term (hall name, location, or state)
    @GetMapping("/search")
    public ResponseEntity<List<Map<String, Object>>> searchFunctionHalls(@RequestParam String query) {
        List<Map<String, Object>> result = functionHallService.searchFunctionHalls(query);
        return ResponseEntity.ok(result);
    }
}
