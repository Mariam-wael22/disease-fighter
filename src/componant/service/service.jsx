import React from 'react'
import { Link } from 'react-router-dom'
import './service.css'
import Logo from '../../image/logo.png'
import ServiceData from './data'
const Service =()=>{
    return(
        <div className='service d-flex flex-column  align-items-center pt-5'>
            <div className='header d-flex align-items-center justify-content-center'>
                <p className='m-0 me-2'>Intial diagnosis and advanced online medical solution with</p>
                <img src={Logo} alt=""/>
            </div>
            <div>
                <ol type="1">
                    {ServiceData.map(data=>
                    <li>
                        <Link to='/home'>
                            <div>
                                <p className='m-0'>{data.title}</p>
                                <p className='data m-0'>{data.data}</p>
                            </div>
                        </Link>
                    </li>
                        )}
                </ol>
            </div>
            <div>
            <p className='btn bg-success text-white shadow p-2 rounded me-2'>Plan and Price</p>
            </div>
        </div>
    )
}
export default Service