import React from 'react'
import { Auth } from '../components/Auth'
import { Name } from '../components/Name'

const Login = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div>
                <Name />
            </div>
            <div>
                <Auth type="login" />
            </div>
        </div>
    )
}
export default Login