import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    // ← ADD THIS: Check localStorage on app load
    useEffect(() => {
        const savedUser = localStorage.getItem("userInfo")
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])

    const login = (userData) => {
        setUser(userData)
        localStorage.setItem("userInfo", JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("userInfo")
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext