import React from 'react'

import { Banner } from './sections/Banner'
import { UserProfile } from './sections/UserProfile'

const HomePage = () => {
    return (
        <React.Fragment>
            <Banner />
            <UserProfile />
        </React.Fragment>
    )
}

export default HomePage