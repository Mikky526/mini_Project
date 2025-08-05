import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [loginError, setLoginError] = useState('');
    const [signupError, setSignupError] = useState('');
    const [signupSuccess, setSignupSuccess] = useState('');

    // Default admin credentials (in a real app, this would be handled by a backend)
    const DEFAULT_ADMIN = {
        email: 'admin@foodorder.com',
        password: 'admin123',
        role: 'admin',
        name: 'Admin User'
    };

    const DEFAULT_USER = {
        email: 'user@foodorder.com',
        password: 'user123',
        role: 'user',
        name: 'Regular User'
    };

    useEffect(() => {
        // Check if user is already logged in (from localStorage)
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
        
        // Load registered users from localStorage
        const savedUsers = localStorage.getItem('registeredUsers');
        if (savedUsers) {
            setRegisteredUsers(JSON.parse(savedUsers));
        }
        
        setIsLoading(false);
    }, []);

    const signup = async (userData) => {
        setIsLoading(true);
        setSignupError('');
        setSignupSuccess('');
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Check if email already exists
            const emailExists = registeredUsers.some(user => user.email === userData.email) ||
                               userData.email === DEFAULT_ADMIN.email ||
                               userData.email === DEFAULT_USER.email;
            
            if (emailExists) {
                setIsLoading(false);
                setSignupError('An account with this email already exists');
                return { success: false, error: 'An account with this email already exists' };
            }
            
            // Create new user
            const newUser = {
                id: Date.now(), // Simple ID generation
                email: userData.email,
                password: userData.password,
                role: 'user', // New users are regular users by default
                name: `${userData.firstName} ${userData.lastName}`,
                firstName: userData.firstName,
                lastName: userData.lastName,
                phone: userData.phone,
                address: userData.address,
                createdAt: new Date().toISOString()
            };
            
            // Save to registered users
            const updatedUsers = [...registeredUsers, newUser];
            setRegisteredUsers(updatedUsers);
            localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
            
            setIsLoading(false);
            setSignupSuccess('Account created successfully! Please sign in.');
            return { success: true, message: 'Account created successfully! Please sign in.' };
            
        } catch (error) {
            setIsLoading(false);
            setSignupError('Registration failed. Please try again.');
            return { success: false, error: 'Registration failed. Please try again.' };
        }
    };

    const login = async (email, password) => {
        setIsLoading(true);
        setLoginError('');
        
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Check credentials
            let authenticatedUser = null;
            
            // Check default admin
            if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
                authenticatedUser = {
                    id: 1,
                    email: DEFAULT_ADMIN.email,
                    role: DEFAULT_ADMIN.role,
                    name: DEFAULT_ADMIN.name
                };
            }
            // Check default user
            else if (email === DEFAULT_USER.email && password === DEFAULT_USER.password) {
                authenticatedUser = {
                    id: 2,
                    email: DEFAULT_USER.email,
                    role: DEFAULT_USER.role,
                    name: DEFAULT_USER.name
                };
            }
            // Check registered users
            else {
                const foundUser = registeredUsers.find(user => 
                    user.email === email && user.password === password
                );
                
                if (foundUser) {
                    authenticatedUser = {
                        id: foundUser.id,
                        email: foundUser.email,
                        role: foundUser.role,
                        name: foundUser.name,
                        firstName: foundUser.firstName,
                        lastName: foundUser.lastName,
                        phone: foundUser.phone,
                        address: foundUser.address
                    };
                }
            }
            
            if (authenticatedUser) {
                setUser(authenticatedUser);
                localStorage.setItem('currentUser', JSON.stringify(authenticatedUser));
                setIsLoading(false);
                return { success: true, user: authenticatedUser };
            } else {
                setIsLoading(false);
                setLoginError('Invalid email or password');
                return { success: false, error: 'Invalid email or password' };
            }
        } catch (error) {
            setIsLoading(false);
            setLoginError('Login failed. Please try again.');
            return { success: false, error: 'Login failed. Please try again.' };
        }
    };

    const logout = () => {
        setUser(null);
        setLoginError('');
        setSignupError('');
        setSignupSuccess('');
        localStorage.removeItem('currentUser');
    };

    const isAdmin = () => {
        return user && user.role === 'admin';
    };

    const isAuthenticated = () => {
        return !!user;
    };

    const getAllUsers = () => {
        return registeredUsers;
    };

    return {
        user,
        isLoading,
        loginError,
        signupError,
        signupSuccess,
        signup,
        login,
        logout,
        isAdmin,
        isAuthenticated,
        getAllUsers
    };
};
