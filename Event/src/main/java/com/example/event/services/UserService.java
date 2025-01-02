package com.example.event.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.event.entity.User;
import com.example.event.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Method to get all User records
    public List<User> findAll() {
        return userRepository.findAll();
    }

    // Method to get a User by its Id
    public Optional<User> findById(Integer id) {
        return userRepository.findById(id);
    }

    // Method to save a new or update an existing User
    public User save(User user) {
        return userRepository.save(user);
    }

    // Method to delete a User by its Id
    public void deleteById(Integer id) {
        userRepository.deleteById(id);
    }

    // Method to find a User by Email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByUserEmail(email);
    }
}
