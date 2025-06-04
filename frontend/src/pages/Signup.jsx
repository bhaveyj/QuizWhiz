import React from 'react'
import { Auth } from '../components/Auth'
import { Name } from '../components/Name'

const Signup = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div>
                <Name />
            </div>
            <div>
                <Auth type="signup" />
            </div>
        </div>
    )
}
export default Signup