import React, { useEffect, useState } from 'react'
import { useAuthPreferences } from '../../hooks/useAuthPreferences'

export const AuthStatus = () => {

    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { isLogin } = useAuthPreferences();

    useEffect(() => {
        if (isLogin !== null && isLogin !== undefined) {
            setIsLoggedIn(isLogin);
            setLoading(false);
        }
    }, [isLogin]);

    if (loading) {
        return (
            <div className='px-4 py-2 bg-purple-50 border border-gray-300 rounded-2xl flex items-center gap-2 shadow-2xl'>
                <div className='relative'>
                    <div className="bg-blue-700 w-2 h-2 relative z-10 rounded-full"></div>
                    <div className="bg-blue-700 w-3 left-1/2 top-1/2 animate-pulse -translate-1/2 h-3 absolute rounded-full"></div>
                </div>
                <p className="text-blue-700 uppercase font-light text-sm">Loading</p>
            </div>
        )
    }

    return (
        <div className='px-4 py-2 bg-purple-50 border border-gray-300 rounded-2xl flex items-center gap-2 shadow-2xl'>
            <div className='relative'>
                <div className={`${!isLoggedIn ? "bg-red-700" : "bg-green-700"} w-2 h-2 relative z-10 rounded-full`}></div>
                <div className={`${!isLoggedIn ? "bg-red-700" : "bg-green-700"} w-3 left-1/2 top-1/2 animate-pulse -translate-1/2 h-3 absolute rounded-full`}></div>                
            </div>
            <p className={`${!isLoggedIn ? "text-red-700" : "text-green-700"} uppercase font-light text-sm`}>{isLoggedIn ? "Logged in" : "Offline"}</p>
        </div>
    )
}

