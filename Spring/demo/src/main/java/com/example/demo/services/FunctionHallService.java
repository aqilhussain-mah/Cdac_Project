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
        return functionHallRepository.findByState(stateName);
    }

    // Get details of a FunctionHall by state and hallId
    public FunctionHall getFunctionHallDetails(int hallId) {
        return functionHallRepository.findById(hallId).orElse(null);
    }

    // Add a new FunctionHall
    public FunctionHall addFunctionHall(String stateName, String hallName, String location, long adminId) {
        Users admin = usersRepository.findById(adminId).orElse(null);
        if (admin == null) {
            throw new IllegalArgumentException("Admin not found for ID: " + adminId);
        }

        FunctionHall functionHall = new FunctionHall(hallName, location, stateName, admin);
        return functionHallRepository.save(functionHall);
    }

    // Get all function halls
    public List<FunctionHall> getAllFunctionHalls() {
        return functionHallRepository.findAll();
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
                result.put("hallName", hall.getHallName());
                result.put("location", hall.getLocation());
                result.put("admin", hall.getAdmin().getUsername());
                results.add(result);
            }
        }

        return results;
    }

    public List<FunctionHall> getFunctionHallsByAdminId(long adminId) {
        return functionHallRepository.findByAdmin_Id(adminId);
    }

    // Updated method for updating the FunctionHall
    public FunctionHall updateFunctionHall(FunctionHall updatedHall) {
        int hallId = updatedHall.getHallId();

        FunctionHall existingHall = functionHallRepository.findById(hallId).orElse(null);

        if (existingHall == null) {
            throw new RuntimeException("Function hall not found");
        }

        existingHall.setHallName(updatedHall.getHallName());
        existingHall.setLocation(updatedHall.getLocation());
        existingHall.setState(updatedHall.getState());

        if (updatedHall.getAdmin() != null && updatedHall.getAdmin().getId() != null) {
            Users admin = usersRepository.findById(updatedHall.getAdmin().getId()).orElse(null);
            if (admin != null) {
                existingHall.setAdmin(admin);
            } else {
                throw new RuntimeException("Admin not found");
            }
        }

        return functionHallRepository.save(existingHall);
    }
}
