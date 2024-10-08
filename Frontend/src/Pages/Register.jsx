import React,{ useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Register = () => {
  const baseUrl = import.meta.env.VITE_API_URL

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setSuccess(''); // Clear previous success messages
    if (!termsAccepted) {
      setError('You must accept the terms and conditions')
      return
    }

    try { 
      const response = await axios.post(`${baseUrl}/api/user/register/`, {
        email,
        name,
        password,
        confirmPassword,
        tc:termsAccepted,
      },{
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data=response.data
      setSuccess(data.message);
      // Clear input fields
      setEmail('');
      setName('');
      setPassword('');
      setConfirmPassword('');
      setTermsAccepted(false);
      setError('');
    } catch (error) {
      console.log(error.response.data.email);
      if (error.response && error.response.data) {
        setError(error.response.data.Error ||error.response.data.email||'Failed to register');
      }else{
        setError('An error occurred');
      }
      console.error(error);
    }
  }
  return (
  <>
        <div className="p-5 mb-2">
        <section className=" ">
          <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
            <h1 className="text-2xl font-bold  mb-1 text-white-900 md:text-3xl">Register Page</h1>
            <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
              <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
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
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      id="name"
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      placeholder="johndoe"
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
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
                      required=""
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      id="confirm-password"
                      placeholder="••••••••"
                      className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      required=""
                    />
                  </div>
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className="focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 h-4 w-4 rounded border border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800"
                        required=""
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500 dark:text-gray-300"
                      >
                        I accept the{" "}
                        <Link
                          className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                          to="#"
                        >
                          Terms and Conditions
                        </Link>
                      </label>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#48e1b1] hover:bg-[#9df3d7] focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
                  >
                    Create an account
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-primary-600 dark:text-primary-500 font-medium hover:underline"
                    >
                      Login here
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <br />
      <br />
  </>
  )
}

export default Register
