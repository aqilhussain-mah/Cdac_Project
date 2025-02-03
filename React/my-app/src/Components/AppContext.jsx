    import React, { createContext, useState, useEffect } from "react";

    // Create the context
    const AppContext = createContext();

    // Create the provider component
    const AppProvider = ({ children }) => {
        // Load initial state from sessionStorage or use null as the default for username and role
        const [username, setUsername] = useState(sessionStorage.getItem("username") || null);
        const [role, setRole] = useState(sessionStorage.getItem("role") || null);

        // Save to sessionStorage whenever username or role changes
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

        // Function to update username (after login)
        const updateUsername = (name) => {
            setUsername(name);
        };

        // Function to update role (after login)
        const updateRole = (userRole) => {
            setRole(userRole);
        };

        // Function to log out (reset username and role)
        const logout = () => {
            setUsername(null); // Reset username to null
            setRole(null); // Reset role to null
            // Clear sessionStorage on logout
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("role");
        };

        // Function to handle user login
        const login = (name, userRole) => {
            setUsername(name); // Update username with the name from backend
            setRole(userRole);  // Set the user role based on backend response
            sessionStorage.setItem("username", name);
            sessionStorage.setItem("role", userRole);
        };

        // Provide the context value
        const contextValue = {
            username,
            role,
            updateUsername,
            updateRole,
            login, // Add login function to context
            logout,
        };

        return (
            <AppContext.Provider value={contextValue}>
                {children}
            </AppContext.Provider>
        );
    };

    export { AppContext, AppProvider };