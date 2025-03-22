import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';

import HomePage from './pages/Home/HomePage';
import RegisterPage from './pages/Auth/Register/RegisterPage';
import LoginPage from './pages/Auth/Login/LoginPage';

const App = () => {
    
    const location = useLocation();
    
    return (
        <React.Fragment>

            <Toaster position='bottom-left' expand visibleToasts={3} />

            <main>
                <Routes location={location} key={location.pathname}>

                    <Route path="/" element={<HomePage />} />

                    <Route path="/auth/register" element={<RegisterPage />} />
                    <Route path="/auth/login" element={<LoginPage />} />

                </Routes>
            </main>

        </React.Fragment>
    )
}

export default App