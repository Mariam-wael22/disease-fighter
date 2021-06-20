import React from 'react'
import './appointments.css'
import Navbar from '../../componant/navbar/navbar';
import Menu from '../../componant/menu/menu'
import Appointment from '../../componant/appointment/appointment';

class Appointments extends React.Component{


    render(){
        return(
            <div>
                <Navbar />
                    <div className='d-flex'>
                        <Menu />
                        <div className='main-container col-lg-10 col-md-10'>
                        <Appointment />
                        </div>
                    </div>
                
            </div>
        )
    }
    
}
export default Appointments;