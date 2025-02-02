import React, { createContext, useState, useEffect } from "react";

// Create the context
const AppContext = createContext();

// Create the provider component
const AppProvider = ({ children }) => {
    // Load initial state from sessionStorage or use defaults
    const [username, setUsername] = useState(
        sessionStorage.getItem("username") || "Guest"
    );
    const [role, setRole] = useState(
        sessionStorage.getItem("role") || null
    );

    // Save to sessionStorage whenever username or role changes
    useEffect(() => {
        sessionStorage.setItem("username", username);
    }, [username]);

    useEffect(() => {
        sessionStorage.setItem("role", role);
    }, [role]);

    // Function to update username
    const updateUsername = (name) => {
        setUsername(name);
    };

    // Function to update role
    const updateRole = (userRole) => {
        setRole(userRole);
    };

    // Function to log out (reset username and role)
    const logout = () => {
        setUsername("Guest"); // Reset to default value
        setRole(null); // Reset role to null
        // Clear sessionStorage on logout
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("role");
    };

    // Provide the context value
    const contextValue = {
        username,
        role,
        updateUsername,
        updateRole,
        logout,
    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };