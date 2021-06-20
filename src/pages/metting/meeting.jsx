import {React,useState} from 'react'
import {useLocation,useHistory} from 'react-router-dom'
import './meeting.css'
import '../../componant/globalstyle.css'
import Navbar from '../../componant/navbar/navbar'
import Menu from '../../componant/menu/menu'

const Meeting =()=>{
    const location =useLocation()
    const history=useHistory()
    var app=null
    if(location.state){
        app=location.state.app
    }
    return(
        <div>
            {console.log(app)}
            <Navbar />
            <div className='d-flex'>
                <Menu />
                <div className='main-container d-flex justify-content-center col-lg-10 col-md-10'>
                <div className='meeting col-5'>
                    {app?(
                        <div>
                            <div className='d-flex justify-content-center'>
                                    <img src={app.doctor_avatar} alt='doctor avatar'/>
                            </div>
                            <div className='d-flex flex-column align-items-center mt-2'>
                                <h5 className='m-0'>Dr. {app.doctor_name}</h5>
                                <p className='m-0'>{app.specialization}</p>
                                <p className='m-0'>{app.day}-{app.date}</p>
                            </div>
                            <div class="mb-1 mt-2">
                                <label>Diagnosis</label>
                                <textarea class="form-control shadow p-2 rounded" value={app.diagnosis} readOnly/>
                            </div>
                            <div class="mb-1">
                                <label>Medicines</label>
                                <textarea class="form-control shadow p-2 rounded" value={app.medicines} readOnly/>
                            </div>
                            <div className='mt-2'>
                            <label>Files</label>
                            </div>
                            <div class="d-flex mt-1 files-img">
                                {app.files.map((file)=>(
                                    <img src={file} alt="file" />
                                ))}
                            </div>
                        </div>
                    ):(null)}
                </div>
                </div>
            </div>
        </div>
    )
}

export default Meeting