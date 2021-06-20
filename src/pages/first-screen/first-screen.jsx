import React from 'react'
import {Link} from 'react-router-dom'
import './first-screen.css'
import Logo from '../../image/logo.png'
import Doctor from '../../image/Doctor.png'
import FirstImage from '../../image/first-screen.png'
const FirstScreen=()=>{
    return(
        <div className='first-screen'>
            <header >
                <div class='first-screen-nav container1'>
        <div class="navbar navbar-expand-lg navbar-light bg-none">
            <div class='logo col-lg-4'><img src={Logo} alt="" /></div>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <Link class="nav-link" aria-current="page" to="/home">Home</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="#">Services</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="#">About Us</Link>
                  </li>
                  <li class="nav-item">
                    <Link class="nav-link" to="#">News</Link>
                  </li>
              </ul>
              <div class='col-lg-5 navbar-button d-flex'>
                <Link to='/login' class='btn active shadow p-2 w-50 rounded me-2'>Login</Link>
                <Link to='/signup' class='btn shadow p-2 w-50 rounded'>Sign Up</Link>
            </div>
          </div>
          
        </div>
        </div>
        <div className='container1 nav-images d-flex'>
                    <div className='get-start col-lg-6 col-md-6'>
                        <img src={FirstImage} alt="" />
                        <Link to='/home' className='btn active shadow p-3 mt-3 rounded'>Get Started</Link>
                    </div>
                    <div className='col-lg-6 col-md-6 d-none d-lg-block d-md-block'>
                    <img src={Doctor} alt="" />
                    </div>
                </div>
</header>
                
        </div>
    )
}
export default FirstScreen