import {React,useState} from 'react'
import './doctor-home.css'
import Ai from '../../image/AI.png'
import Doctors from '../../image/Doctors.png'
import DoctorAppointment from '../doctor-appointment/doctor-appointment'

const DcotorHome =({data,name})=> {
    const [appointment,setAppointment]=useState({curr:'active-appointment',next:'',prev:''})
    return(
        <div>
            <div className='d-flex doctor-home'>
                <div className='doctor-nav d-flex shadow rounded'>
                <div className='col-9 d-flex flex-column justify-content-center ps-2'>
                    <h5 className=''>Hello! Dr {name}</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     At vero est nemo numquam explicabo</p>
                </div>
                <div className='col-3'>
                    <img src={Ai} alt="" />
                </div>
            </div>
            <div className='doctor-nav d-flex shadow rounded'>
                <div className='col-9 d-flex flex-column justify-content-center ps-2'>
                    <h5 className=' mb-1'>Hello! Dr {name}</h5>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     At vero est nemo numquam explicabo</p>
                </div>
                <div className='col-3'>
                    <img src={Doctors} alt="" />
                </div>
             </div>   
            </div>
            <div className='meeting-session shadow rounded'>
                <div className='meeting-session-header d-flex align-items-center justify-content-center flex-wrap'>
                    <h3 className='col-6'>My Appointment</h3>
                        <select class="form-control form-select shadow p-2 rounded d-lg-none d-md-none" onChange={(e)=>{
                            if(e.target.value==='Today Appointment'){
                                setAppointment({curr:'active-appointment'})
                            }
                            else if(e.target.value==='Future Appointment'){
                                setAppointment({next:'active-appointment'})
                            }
                            else if(e.target.value==='Previous Appointment'){
                                setAppointment({prev:'active-appointment'})
                            }
                        }}>
                            <option>Today Appointment</option>
                            <option>Future Appointment</option>
                            <option>Previous Appointment</option>
                        </select>
                    <div className='d-flex appointment-nav col-6'>
                        <p className={`${appointment.curr}`} onClick={()=>setAppointment({curr:'active-appointment'})}>Today Appointment</p>
                        <p className={`${appointment.next}`} onClick={()=>setAppointment({next:'active-appointment'})}>Future Appointment</p>
                        <p className={`${appointment.prev}`} onClick={()=>setAppointment({prev:'active-appointment'})}>Previous Appointment</p>
                    </div>
                </div>
                <div className='meeting-session-containt'>
                    <div className='d-flex meeting-session-header'>
                        <p className='col-1'></p>
                        <div className='d-flex col-10'>
                        <p className='col-3'>Patient Name</p>
                        <p className='col-3'>Date</p>
                        <p className='col-2'>Time</p>
                        <p className='col-2'></p>
                        </div>
                    </div>
                    {data?(
                        <div>
                            {appointment.curr?(
                        data.current_appointments?(
                            data.current_appointments.map((session_info)=>(
                                <DoctorAppointment {...session_info}/>
                            ))
                        ):(null)
                    ):(null)}
                    {appointment.next?(
                        data.future_appointments?(
                            data.future_appointments.map((session_info)=>(
                                <DoctorAppointment {...session_info}/>
                            ))
                        ):(null)
                    ):(null)}
                    {appointment.prev?(
                        data.previous_appointments?(
                            data.previous_appointments.map((session_info)=>(
                                <DoctorAppointment {...session_info}/>
                            ))
                        ):(null)
                    ):(null)}
                        </div>
                    ):(null)}
                     
                </div>
            </div>
        </div>
    )
}
export default DcotorHome