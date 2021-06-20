import React from 'react'
import './appointment-info.css'
const AppointmentInfo=({doctor_name,day,date,time,doctor_avatar,doctor_id,id,period_id,...props})=>{
    return(
        <div className='AppointmentInfo'>
            <div className='avatar'>
            <img src={doctor_avatar} alt="" />
            </div>
            <div className='Appointment-data'>
                <h3>{doctor_name}</h3>
                <p>{day},{date},{time}</p>
            </div>
            <i className='fa fa-ellipsis-v'></i>
        </div>
    )
}

export default AppointmentInfo