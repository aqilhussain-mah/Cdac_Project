package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.Entity.FunctionHall;
import com.example.demo.Entity.Users;
import com.example.demo.repository.FunctionHallRepository;
import com.example.demo.repository.UsersRepository;

import java.util.List;
import java.util.ArrayList;
import java.util.Map;
import java.util.HashMap;

@Service
@Transactional
public class FunctionHallService {

    @Autowired
    private FunctionHallRepository functionHallRepository;

    @Autowired
    private UsersRepository usersRepository;

    // Get FunctionHalls based on State name
    public List<FunctionHall> getFunctionHallsByState(String stateName) {
        // Fetch function halls based on the state name (now it's a String)
        return functionHallRepository.findByState(stateName); // Assuming you have a query method in your repository
    }

    // Get details of a FunctionHall by state and hallId
    public FunctionHall getFunctionHallDetails(int hallId) {
        return functionHallRepository.findById(hallId).orElse(null);
    }


    // Add a new FunctionHall
    public FunctionHall addFunctionHall(String stateName, String hallName, String location, long adminId) {
        // Fetch admin by ID
        Users admin = usersRepository.findById(adminId).orElse(null);
        if (admin == null) {
            throw new IllegalArgumentException("Admin not found for ID: " + adminId);
        }

        // Create a new FunctionHall with the state (as String) and admin
        FunctionHall functionHall = new FunctionHall(hallName, location, stateName, admin);
        return functionHallRepository.save(functionHall); // Save and return the entity
    }

    // Get all function halls
    public List<FunctionHall> getAllFunctionHalls() {
        return functionHallRepository.findAll(); // Fetch all function halls
    }

    // Search FunctionHalls by term (hallName, location, or stateName)
    public List<Map<String, Object>> searchFunctionHalls(String searchTerm) {
        List<Map<String, Object>> results = new ArrayList<>();

        List<FunctionHall> halls = functionHallRepository.findAll();

        for (FunctionHall hall : halls) {
            if (hall.getHallName().toLowerCase().contains(searchTerm.toLowerCase()) ||
                    hall.getLocation().toLowerCase().contains(searchTerm.toLowerCase()) ||
                    hall.getState().toLowerCase().contains(searchTerm.toLowerCase())) {
                Map<String, Object> result = new HashMap<>();
                result.put("state", hall.getState());
                result.put("hallId", hall.getHallId());
                result.put("hallName", hall.getHallName()); // Include hallName
                result.put("location", hall.getLocation());
                result.put("admin", hall.getAdmin().getUsername()); // Include admin's username
                results.add(result);
            }
        }

        return results;
    }
    
    public List<FunctionHall> getFunctionHallsByAdminId(long adminId) {
        return functionHallRepository.findByAdmin_Id(adminId); // Fetch halls by adminId
    }
}
