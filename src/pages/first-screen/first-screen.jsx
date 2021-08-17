import {React ,useState} from 'react'
import {Link} from 'react-router-dom'
import './first-screen.css'
import Logo from '../../image/logo.png'
import Doctor from '../../image/Doctor.png'
import Service from '../../componant/service/service'
import About from '../../componant/about/about'
const FirstScreen=()=>{
  const [Color,setColor]=useState('')
    return(
        <div className='first-screen'>
            <header >
                <div className='first-screen-nav container1'>
        <div className="navbar navbar-expand-lg navbar-light bg-none">
            <div className='logo col-lg-4'><img src={Logo} alt="" onClick={()=>setColor('')}/></div>
            
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" style={{color: Color==="home"?('rgb(97, 197, 247)'):(null)}} to="/home" onClick={()=>setColor('home')}>Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" style={{color: Color==="Services"?('rgb(97, 197, 247)'):(null)}} onClick={()=>setColor('Services')}>Services</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" style={{color: Color==="About"?('rgb(97, 197, 247)'):(null)}} onClick={()=>setColor('About')}>About Us</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" style={{color: Color==="News"?('rgb(97, 197, 247)'):(null)}} onClick={()=>setColor('News')}>News</Link>
                  </li>
              </ul>
              <div className='col-lg-5 navbar-button d-flex'>
                <Link to='/login' className='btn active shadow p-2 w-50 rounded me-2'>Login</Link>
                <Link to='/signup' className='btn shadow p-2 w-50 rounded'>Sign Up</Link>
            </div>
          </div>
          
        </div>
        </div>
        {
          Color?(
            Color==='Services'?(
              <Service />
            ):(
              <About />
            )
          ):(
            <div className='container1 nav-images d-flex'>
              <div className='get-start col-lg-6 col-md-6'>
                  <h3 className='first-h3'>Disease Fighter</h3>
                  <h3 className='second-h3'>Through <span style={{color: "#2baae9"}}>Ai</span> </h3>
                  <p>intial diagnosis and advanced online medical solution</p>
                  <Link to='/home' className='btn active shadow p-3 mt-3 rounded'>Get Started</Link>
              </div>
              <div className='col-lg-6 col-md-6 d-none d-lg-block d-md-block'>
              <img src={Doctor} alt="" />
              </div>
        </div>
          )
        }  
        
</header>
                
        </div>
    )
}
export default FirstScreen