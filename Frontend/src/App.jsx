import React from 'react'
import Cookies from 'js-cookie';
import { BrowserRouter ,Routes ,Route ,Navigate } from 'react-router-dom'
import ProtectedRoutes from './Components/ProtectedRoutes';
import Home from './Pages/Home';
import { Login } from './Pages/Login';
import Register from './Pages/Register';
import { NotFound } from './Pages/NotFound';
import { REFRESH_TOKEN,ACCESS_TOKEN } from './constants';


function Logout() {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(REFRESH_TOKEN);
    return <Navigate to='/login' />
}

function RegisterAndLogout(){
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(REFRESH_TOKEN);
    return <Register />

}

const App = () => {
  return (
    <>
        <BrowserRouter>
            <Routes>
                {/* Wrap the Home route with ProtectedRoutes to require authentication */}
                <Route
                    path='/'
                element={
                    <ProtectedRoutes>
                        <Home/>
                    </ProtectedRoutes>
                }
                />
                {/* Define public routes */}
                <Route path='/login' element={<Login/>} />
                <Route path='/register' element={<RegisterAndLogout/>} />
                <Route path='*' element={<NotFound/>} />
                {/* <Route path='/logout' element={<Logout/>} /> */}
            </Routes>
        </BrowserRouter>
    
    </>

  )
}

export default App
