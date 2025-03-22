import React, { useEffect, useState } from 'react'
import { useAuthPreferences } from '../../../hooks/useAuthPreferences'

const Skeleton = () => {
    return (
        <div className='mt-2 flex items-center gap-2'>
            <div className='bg-gray-300 p-2 rounded-full'>
                <svg className='text-transparent w-8 h-8' width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 20C5.33579 17.5226 8.50702 16 12 16C15.493 16 18.6642 17.5226 21 20M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <div>
                <div className='h-[12px] mb-1 w-[200px] rounded-2xl bg-gray-300' />
                <div className='h-[12px] w-[100px] rounded-2xl bg-gray-300' />
            </div>
        </div>
    )
}

export const UserProfile = () => {
    
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const { isLogin, userData, userRole } = useAuthPreferences();

    useEffect(() => {
        if (isLogin !== null && isLogin !== undefined) {
            setIsLoggedIn(isLogin);
            setLoading(false);
        }
    }, [isLogin]);

    if (loading) {
        return (
            <section className='w-[60%] mx-auto mt-4 animate-pulse'>
                <div className='h-[100px] rounded-2xl bg-gray-300'></div>
                <Skeleton />
            </section>
        )
    }

    return (
        <section className='w-[60%] mx-auto mt-4'>

            {isLoggedIn ? (
                <React.Fragment>
                    <div className='h-[100px] rounded-2xl bg-purple-200'></div>
                    <div className='mt-2 flex items-center gap-2'>
                        <div className='bg-gray-300 p-2 rounded-full'>
                            <svg className='text-gray-500/50 w-8 h-8' width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 20C5.33579 17.5226 8.50702 16 12 16C15.493 16 18.6642 17.5226 21 20M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </div>
                        <div>
                            {userData && userData.email ? <p className='uppercase font-semibold leading-none mb-1'>{userData.email}</p> : <div className='h-[12px] mb-1 w-[200px] rounded-2xl bg-gray-300' />}
                            <p className='uppercase text-sm leading-none'>Role: {userRole}</p>
                        </div>
                    </div>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <div className='h-[100px] rounded-2xl bg-gray-300'></div>
                    <Skeleton />
                </React.Fragment>
            )}
            

        </section>
    )
}
