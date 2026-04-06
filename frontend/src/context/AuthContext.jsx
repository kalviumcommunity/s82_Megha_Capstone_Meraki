import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Persist login state (localStorage)
    useEffect(() => {
        const savedUser = localStorage.getItem("meraki_user");
        const savedToken = localStorage.getItem("meraki_token");
        
        if (savedUser && savedToken) {
            console.log("AuthContext: Restoring session from localStorage");
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = (userData, token) => {
        console.log("AuthContext: Logging in user:", userData.name);
        setUser(userData);
        if (token) {
            localStorage.setItem("meraki_token", token);
        }
        localStorage.setItem("meraki_user", JSON.stringify(userData));
    };

    const logout = () => {
        console.log("AuthContext: Logging out");
        setUser(null);
        localStorage.removeItem("meraki_user");
        localStorage.removeItem("meraki_token");
    };

    const updateUser = (updatedData) => {
        const newUserData = { ...user, ...updatedData };
        console.log("AuthContext: Updating user data:", newUserData);
        setUser(newUserData);
        localStorage.setItem("meraki_user", JSON.stringify(newUserData));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, updateUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
