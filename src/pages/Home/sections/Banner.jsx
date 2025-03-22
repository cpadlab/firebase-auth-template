import React from 'react'

import logo from "../../../assets/logo.svg"
import { AuthStatus } from '../../../components/Auth/AuthStatus'

export const Banner = () => {
    return (
        <section className='pt-[150px] bg-purple-100 pb-4 relative'>

            <div className='flex justify-center mb-1 gap-2 items-center absolute top-0 right-0 p-4 z-10'>
                <AuthStatus />
            </div>

            <div className='flex justify-center mb-1 gap-2 items-center absolute top-0 left-0 p-4 z-10'>
                <a href="https://www.dewal.es/" target='_blank' ><img src={logo} alt="Logo de Dewal" className='h-12' /></a>
            </div>

            <div>
                
                <h1 className='text-5xl font-bold text-center text-purple-800'>Firebase Auth Template</h1>
                <div className='flex items-center gap-2 justify-center mt-1'>
                    <p className='text-purple-600 text-xl uppercase font-light'>Developed by <a href="https://www.dewal.es/" target='_blank' className='border-b' >Dewal</a> @ Creator <a href="https://cpadilla.es" target='_blank' className='border-b'>Carlos Padilla</a></p>
                </div>
                <div className='flex justify-center mt-2'>
                    <div className='flex group hover:shadow-2xl hover:-translate-y-[3px] transition-all duration-300'>
                        <a target='_blank' href="https://www.dewal.es/resources/firebase-auth-template" className='px-4 py-2 flex items-center gap-1 border border-purple-600 rounded-2xl text-purple-600 relative overflow-hidden'>
                            <span className='text-sm leading-none uppercase font-light transition-all duration-300 relative z-10'>Read docs</span>
                            <div className='flex relative z-10'>
                                <svg className='w-3 h-3 group-hover:opacity-100 group-hover:-translate-y-[3px] group-hover:translate-x-[3px] transition-all duration-300 opacity-50' width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18L18 6M18 6H10M18 6V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </div>
                            <div className='w-full h-full bg-purple-200 group-hover:opacity-100 opacity-0 absolute left-0 top-0 right-0 bottom-0 transition-all duration-300'></div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
