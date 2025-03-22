import React from 'react'

import GithubLogo from '../../../../components/icons/GithubLogo'

export const GithubButton = ({ handle }) => {
    return (
        <button onClick={handle} className='flex border items-center gap-2 border-gray-400 px-4 py-2 cursor-pointer rounded-2xl hover:-translate-y-[3px] hover:shadow-2xl transition-all duration-300 w-full justify-center'>
            <GithubLogo className="w-4 h-4 fill-black" />
            <span className='text-sm leading-none font-light'>Continue with Github</span>
        </button>
    )
}
