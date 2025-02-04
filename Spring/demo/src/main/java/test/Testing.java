//package test;
//
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.stereotype.Component;
//
//import java.util.Arrays;
//import java.util.List;
//import java.util.Map;
//import java.util.HashMap;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:5173")  // Allow requests from the React frontend
//public class Testing {
//
//    // Hardcoded list of users with username, password, and role
//    private static final List<Map<String, String>> USERS = Arrays.asList(
//        new HashMap<String, String>() {{
//            put("username", "User");
//            put("password", "user@123");
//            put("role", "user");
//        }},
//        new HashMap<String, String>() {{
//            put("username", "Admin");
//            put("password", "admin@123");
//            put("role", "admin");
//        }}
//    );
//
//    // POST endpoint to validate user credentials
//    @PostMapping("/api/login")
//    public Map<String, Object> validateUser(@RequestBody Map<String, String> credentials) {
//        String username = credentials.get("username");
//        String password = credentials.get("password");
//        System.out.println("Username:"+username+" Password:"+password);
//        // Validate user credentials using the hardcoded list
//        for (Map<String, String> user : USERS) {
//            if (user.get("username").equals(username) && user.get("password").equals(password)) {
//                return Map.of("success", true, "role", user.get("role"));  // Return true and the role if matched
//            }
//        }
//        return Map.of("success", false);  // Return false if no match
//    }
//}
