import React from 'react'
import './doctor-appointment.css'
import {useLocation,useHistory} from 'react-router-dom'

const DoctorAppointment=({...session_info})=>{
    const location =useLocation()
    const history=useHistory()
    return(
        <div className='d-flex align-items-center smallSession-info'>
            <div className='col-1 f-div2'>
                <img src={session_info.patient_avatar} alt="" />
            </div>
            <div className='d-flex align-items-center f-div col-10'>
            <p className='col-3'>{session_info.name}</p>
            <p className='col-3'>{session_info.date}</p>
            <p className='col-3'>{session_info.time}</p>
            <p className='col-2 btn button' onClick={()=>history.replace({pathname:`/appointments`,state: { session_info:session_info}})}> Show Meeting</p>
            </div>
        </div>
    )
}
export default DoctorAppointment