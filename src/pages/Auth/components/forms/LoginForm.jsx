import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

import { useAuthPreferences } from '../../../../hooks/useAuthPreferences';

import { GithubButton } from '../buttons/GithubButton';
import { GoogleButton } from '../buttons/GoogleButton';

import { HandleLogin, HandleGoogleLogin, HandleGitHubLogin } from '../../Login/HandleLogin';

export const LoginForm = () => {

    const navigate = useNavigate();
    const { setUserData } = useAuthPreferences();

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const [passwordError, setPasswordError] = useState("");
    const [emailError, setEmailError] = useState("");

    const [loading, setLoading] = useState(false);

    const [passwordType, setPasswordType] = useState("password");
    const handleChangePasswordType = (e) => {
        e.preventDefault();
        if (passwordType === "password") { setPasswordType("text"); }
        else { setPasswordType("password"); }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) { setEmailError("Required");return; }
        if (!password) { setPasswordError("Required");return; }

        setEmailError("");setPasswordError("");setLoading(true);

        const response = await HandleLogin({ email, password, setUserData });
        if (response === true) { navigate("/"); } 
        else { setLoading(false); }
        
    }

    return (
        <div className={`flex flex-col sm:p-8 p-4 border border-gray-300 rounded-2xl ${loading && "pointer-events-none"}`}>
            
            <div>
                <p className='select-none text-xl font-semibold'>Welcome,</p>
                <p className='select-none uppercase font-light text-sm'>Log in to continue</p>
            </div>

            <form onSubmit={handleSubmit} className='mt-4 flex flex-col gap-3'>
                
                <div className="flex border items-center gap-2 peer border-gray-400 rounded-2xl relative">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='flex-1 text-gray-500 min-w-auto pr-4 pl-3 block peer py-2 outline-0 sm:w-full w-auto' />
                    <label className={`transition-all duration-200 px-1 -translate-y-1/2 left-4 bg-white font-light absolute text-gray-800 leading-none pointer-events-none ${!email ? "peer-focus:text-xs text-sm  peer-focus:top-0 top-1/2" : "top-0 text-xs"}`}>E-mail<span className='text-red-500'>* {emailError}</span></label>
                </div>

                <div className='flex border items-center gap-2 peer border-gray-400 pr-1 rounded-2xl relative'>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type={passwordType} className='min-w-auto flex-1 text-gray-500 pr-1 pl-3 block peer py-2 outline-0 sm:w-full w-auto' />
                    <button onClick={handleChangePasswordType} className='flex bg-gray-800 text-white cursor-pointer py-2 rounded-lg rounded-r-2xl px-4'>
                        {passwordType === "password" ? (
                            <svg className='w-4 h-4' width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        ) : (
                            <svg className='w-4 h-4' width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.7429 5.09232C11.1494 5.03223 11.5686 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7767C21.8518 11.9016 21.8517 12.0987 21.8231 12.2236C21.7849 12.3899 21.7164 12.4985 21.5792 12.7156C21.2793 13.1901 20.8222 13.8571 20.2165 14.5805M6.72432 6.71504C4.56225 8.1817 3.09445 10.2194 2.42111 11.2853C2.28428 11.5019 2.21587 11.6102 2.17774 11.7765C2.1491 11.9014 2.14909 12.0984 2.17771 12.2234C2.21583 12.3897 2.28393 12.4975 2.42013 12.7132C3.54554 14.4952 6.89541 19 12.0004 19C14.0588 19 15.8319 18.2676 17.2888 17.2766M3.00042 3L21.0004 21M9.8791 9.87868C9.3362 10.4216 9.00042 11.1716 9.00042 12C9.00042 13.6569 10.3436 15 12.0004 15C12.8288 15 13.5788 14.6642 14.1217 14.1213" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        )}
                    </button>
                    <label className={`transition-all duration-200 px-1 -translate-y-1/2 left-4 bg-white font-light absolute text-gray-800 leading-none pointer-events-none ${!password ? "peer-focus:text-xs text-sm  peer-focus:top-0 top-1/2" : "top-0 text-xs"}`}>Password<span className='text-red-500'>* {passwordError}</span></label>
                </div>

                <div className='flex items-center gap-2 peerrelative'>
                    <button type='submit' className={`w-full h-full py-2 bg-gray-800 text-white rounded-2xl hover:-translate-y-[3px] hover:shadow-2xl transition-all duration-300 cursor-pointer flex items-center gap-2 justify-center relative`}>
                        {!loading ? (
                            <React.Fragment>
                                <span className='text-sm uppercase'>Log in</span>
                                <svg className='w-4 h-4' width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11985 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H15M10 7L15 12M15 12L10 17M15 12L3 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <div class="absolute top-1/2 -translate-1/2 left-1/2 border-gray-400 h-4 w-4 animate-spin rounded-full border border-t-blue-600" />
                                <span className='text-transparent text-sm uppercase'>Log in</span>
                                <svg className='text-transparent w-4 h-4' width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 3H16.2C17.8802 3 18.7202 3 19.362 3.32698C19.9265 3.6146 20.3854 4.07354 20.673 4.63803C21 5.27976 21 6.11985 21 7.8V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H15M10 7L15 12M15 12L10 17M15 12L3 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                            </React.Fragment>
                        )}
                    </button>
                </div>

            </form>

            <p className='mt-2 text-center text-sm text-gray-800 opacity-75'>Don't have an account? <Link className="text-blue-500" to={"/auth/register"}>Register</Link></p>
            
            <div className='flex gap-1 items-center mt-4'>
                <span className='block flex-1 h-px bg-gray-500'></span>
                <p className='select-none uppercase font-light text-sm'>or</p>
                <span className='block flex-1 h-px bg-gray-500'></span>
            </div>

            <ul className='flex gap-2 mt-2 sm:flex-row flex-col'>
                <li className='flex'><GoogleButton handle={() => HandleGoogleLogin({ navigate, setUserData })} /></li>
                <li className='flex'><GithubButton handle={() => HandleGitHubLogin({ navigate, setUserData })} /></li>
            </ul>

        </div>
    )
}
