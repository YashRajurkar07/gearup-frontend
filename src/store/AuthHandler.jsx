export const isLoggedIn = () => {
    let token = localStorage.getItem("jwtToken");
    return token != null && token.length > 0;
};

// --- Save Data on Login ---
export const doLogin = (data, next) => {
    localStorage.setItem("jwtToken", data.jwt);
    
    // Save the critical User Details as a JSON string
    const userDetails = {
        id: data.id,
        email: data.email,
        role: data.role,
        name: data.name // if your backend returns this
    };
    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    next(); // Callback to redirect user
};

// --- Clear Data on Logout ---
export const doLogout = (next) => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userDetails");
    localStorage.clear();
    next();
};

// --- Get Current User Data ---
export const getCurrentUser = () => {
    if (isLoggedIn()) {
        return JSON.parse(localStorage.getItem("userDetails"));
    } else {
        return null; // or undefined
    }
};

export const getUserRole = () => {
    const user = getCurrentUser();
    return user ? user.role : null;
};

export const getUserId = () => {
    const user = getCurrentUser();
    return user ? user.id : null;
};

// --- Get Token for API Headers ---
export const getToken = () => {
    return localStorage.getItem("jwtToken");
};