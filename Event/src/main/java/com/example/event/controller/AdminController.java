package com.example.event.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.event.entity.Admin;
import com.example.event.entity.FunctionHall;
import com.example.event.exception.ResourceNotFoundException;
import com.example.event.repository.AdminRepository;
import com.example.event.repository.FunctionHallRepository;
import com.example.event.services.AdminService;

import java.util.List;

@RestController
@RequestMapping("/admins")
public class AdminController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private FunctionHallRepository functionHallRepository;

    @Autowired
    private AdminService adminService;

    @GetMapping("/{adminId}")
    public ResponseEntity<Admin> getAdmin(@PathVariable Integer adminId) {
        return ResponseEntity.ok(adminService.getAdminById(adminId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable int id, @RequestBody Admin admin) {
        Admin existingAdmin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found"));

        existingAdmin.setAdminName(admin.getAdminName());
        existingAdmin.setAdminEmail(admin.getAdminEmail());
        existingAdmin.setAdminPhnNumber(admin.getAdminPhnNumber());
        existingAdmin.setAdminPassword(admin.getAdminPassword());
        existingAdmin.setRole(admin.getRole());

        if (admin.getFunctionHall() != null) {
            FunctionHall functionHall = functionHallRepository.findById(admin.getFunctionHall().getFunctionHallId()).orElse(null);
            if (functionHall != null) {
                existingAdmin.setFunctionHall(functionHall);
            }
        }

        Admin updatedAdmin = adminRepository.save(existingAdmin);

        return ResponseEntity.ok(updatedAdmin);
    }

    @DeleteMapping("/{adminId}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Integer adminId) {
        adminService.deleteAdmin(adminId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Admin>> getAllAdmins() {
        List<Admin> admins = adminService.findAll();
        return ResponseEntity.ok(admins);
    }
}
