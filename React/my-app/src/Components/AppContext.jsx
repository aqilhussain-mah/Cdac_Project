import React, { createContext, useState, useEffect } from "react";

// Create the context
const AppContext = createContext();

// Create the provider component
const AppProvider = ({ children }) => {
    // Load initial state from sessionStorage or use null as the default for username, role, and userId
    const [username, setUsername] = useState(sessionStorage.getItem("username") || null);
    const [role, setRole] = useState(sessionStorage.getItem("role") || null);
    const [userId, setUserId] = useState(sessionStorage.getItem("userId") || null);  // Add userId state

    // Hardcoded list of Indian states
    const stateList = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", 
        "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", 
        "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", 
        "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
        "West Bengal", "Andaman and Nicobar Islands", "Chandigarh"
    ];

    // Save to sessionStorage whenever username, role, or userId changes
    useEffect(() => {
        if (username !== null) {
            sessionStorage.setItem("username", username);
        }
    }, [username]);

    useEffect(() => {
        if (role !== null) {
            sessionStorage.setItem("role", role);
        }
    }, [role]);

    useEffect(() => {
        if (userId !== null) {
            sessionStorage.setItem("userId", userId);
        }
    }, [userId]);

    // Function to update username (after login)
    const updateUsername = (name) => {
        setUsername(name);
    };

    // Function to update role (after login)
    const updateRole = (userRole) => {
        setRole(userRole);
    };

    // Function to update userId (after login)
    const updateUserId = (id) => {
        setUserId(id);
    };

    // Function to log out (reset username, role, and userId)
    const logout = () => {
        setUsername(null);
        setRole(null);
        setUserId(null);  // Clear userId on logout
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("userId");
    };

    // Function to handle user login
    const login = (name, userRole, id) => {
        setUsername(name);
        setRole(userRole);
        setUserId(id);  // Set userId on login
        sessionStorage.setItem("username", name);
        sessionStorage.setItem("role", userRole);
        sessionStorage.setItem("userId", id);  // Save userId to sessionStorage
    };

    // Provide the context value
    const contextValue = {
        username,
        role,
        userId,  // Expose userId in context
        stateList,  // Expose stateList in context
        updateUsername,
        updateRole,
        updateUserId,  // Expose updateUserId function
        login,
        logout,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
