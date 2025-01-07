import React, { createContext, useState } from "react";

// Create the context
const AppContext = createContext();

// Create the provider component
const AppProvider = ({ children }) => {
    const [username, setUsername] = useState("Username"); // Default value is "Username"
    const [role, setRole] = useState(null); // Default value is null

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
        setUsername("Username"); // Reset to default value
        setRole(null); // Reset role to null
    };

    return (
        <AppContext.Provider value={{ username, role, updateUsername, updateRole, logout }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };
