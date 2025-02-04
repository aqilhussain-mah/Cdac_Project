package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
	
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Users;
import com.example.demo.repository.UsersRepository;

import java.util.Optional;


@Service
public class UsersService {

    @Autowired
    private UsersRepository userRepository;

    public void createUser(Users user) {
    	if (user.getFirstName() == null || user.getLastName() == null || user.getUsername() == null || user.getMobile() == null || user.getRole() == null || user.getPassword() == null) {
            throw new IllegalArgumentException("First name, last name, or username cannot be null");
        }
        userRepository.save(user); // No password encoding in this simplified version
    }

    public Optional<Users> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}