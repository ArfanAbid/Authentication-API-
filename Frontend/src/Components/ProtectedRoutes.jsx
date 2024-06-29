import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import  Cookies  from "js-cookie";
import api from "../api";
import { REFRESH_TOKEN,ACCESS_TOKEN } from "../constants";

// function ProtectedRoutes(){
const ProtectedRoutes = ({ children }) => {

    const [isAuthorized, setIsAuthorized] = useState(null);

    // Effect hook to run the authentication process once when the component mounts
    useEffect(() => {
        authenticate().then(() => {}).catch(() => setIsAuthorized(false));
    }, []);

    // Function to refresh the access token if it's expired
    const refreshToken  = async () => {
        const refreshToken  = Cookies.get(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken ,
        });

        if (res.status === 200) {
            Cookies.set(ACCESS_TOKEN, res.data.access);
            setIsAuthorized(true);
        } else {
            // setisAuthorized(false);
            throw new Error('Failed to refresh token');
        }
        } catch (error) {
            console.error("Failed to refresh token:", error);
            setIsAuthorized(false);
        }
    };

    // Function to authenticate the user
    const authenticate = async () => {
        const token = Cookies.get(ACCESS_TOKEN);
        if (!token) {
        setIsAuthorized(false);
        return;
        }
        try {
            // Decode the token and check its expiration
            const decoded = jwtDecode(token);
            const tokenExpires = decoded.exp * 1000; // Convert to milliseconds
            const now = Date.now();

            if (tokenExpires < now) {
                await refreshToken (); // Refresh the token if it's expired
            }
        } catch (error) {
            console.error("Authentication failed:", error);
            setIsAuthorized(false);
        }
    };

    // Render loading content while the authorization status is being determined
    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;
