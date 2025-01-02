package com.example.event.services;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.event.entity.Admin;
import com.example.event.repository.AdminRepository;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin getAdminById(Integer adminId) {
        return adminRepository.findById(adminId).orElse(null);
    }

    public Admin saveAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public void deleteAdmin(Integer adminId) {
        adminRepository.deleteById(adminId);
    }

    public List<Admin> findAll() {
        return adminRepository.findAll();
    }
}

