import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

function Login() {
  const baseUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    try {
      const response = await axios.post(
        `${baseUrl}/api/user/login/`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      // console.log(response);
      setSuccess(data.message);
      
      // Dispatch login action
      dispatch(login({
        access: data.access,
        refresh: data.refresh,
        user: email,
      }));

      // //  This is done in the store/authSlice.js file. Redux Set cookies 
      // Cookies.set("access", data.access, { expires: 1, path: "/", secure: true, sameSite: 'Strict' });
      // Cookies.set("refresh", data.refresh, { expires: 1, path: "/", secure: true, sameSite: 'Strict' });

      // Clear input fields
      setEmail("");
      setPassword("");

      // Navigate to homepage after login
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      if (error.response && error.response.data) {
        setError(error.response.data.Error || "Failed to login");
      } else {
        setError("An error occurred");
      }
      console.error(error);
    }
  };

/*  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    try {
      const response = await fetch(`${baseUrl}/api/user/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        // Handle non-200 status codes
        throw new Error(data.Error || "Failed to login");
      }

      setSuccess(data.message);
      // Set cookies
      Cookies.set("access", data.access, { expires: 1, path: "/", secure: true, sameSite: 'Strict' });
      Cookies.set("refresh", data.refresh, { expires: 1, path: "/", secure: true, sameSite: 'Strict' });
      

      // Clear input fields
      setEmail("");
      setPassword("");

      // Navigate to homepage after login
      navigate("/");
    } catch (error) {
      setError(error.message || "An error occurred");
      console.error(error);
    }
  };
*/
  return (
    <div>
      <section>
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <h1 className="text-2xl font-bold mb-1 text-white-900 md:text-3xl">Login Page</h1>
          <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Verify Credential
              </h1>
              {error && <p className="text-red-500">{error}</p>}
              {success && <p className="text-green-500">{success}</p>}
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="name@company.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    placeholder="••••••••"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#48e1b1] hover:bg-[#9df3d7] focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-primary-600 dark:text-primary-500 font-medium hover:underline">
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
