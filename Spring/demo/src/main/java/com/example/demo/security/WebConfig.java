package com.example.demo.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/users/**") // Apply to all endpoints under /users
                .allowedOrigins("http://localhost:5173") // Replace with your frontend's origin
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Specify allowed methods
                .allowedHeaders("*") // Allow all headers (or specify which ones)
                .allowCredentials(true); // If you need to send cookies or authentication headers
    }
}