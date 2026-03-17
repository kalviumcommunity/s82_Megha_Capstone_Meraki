import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Persist login state for demo (localStorage)
    useEffect(() => {
        const savedUser = localStorage.getItem("meraki_user");
        if (savedUser) {
            console.log("AuthContext: Restoring user from localStorage:", savedUser);
            setUser(JSON.parse(savedUser));
        } else {
            console.log("AuthContext: No user found in localStorage");
        }
        setIsLoading(false);
    }, []);

    const login = (userData) => {
        console.log("AuthContext: Logging in user:", userData);
        setUser(userData);
        localStorage.setItem("meraki_user", JSON.stringify(userData));
    };

    const logout = () => {
        console.log("AuthContext: Logging out");
        setUser(null);
        localStorage.removeItem("meraki_user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
