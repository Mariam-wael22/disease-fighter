import React from 'react'
import './about.css'
import Video from '../../image/video.mp4'
const About =()=>{
    return(
        <div className='d-flex justify-content-center align-items-center h-100'>
           <video autoPlay >
                <source src={Video} type="video/mp4"/>
            </video>
        </div>
    )
}
export default About