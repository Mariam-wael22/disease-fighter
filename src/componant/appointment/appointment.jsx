import React from 'react'
import { withRouter } from 'react-router-dom'
import './appointment.css'
import '../../componant/globalstyle.css'
import AppointmentInfo from '../appointment-info/appointment-info'

class Appointment extends React.Component{
    constructor(){
        super()
        this.state={
            specializations:null,
            top_doctors:null,
            activef:true,
            prevdata:null,
            nextdata:null,
            currdata:null
        }
        }
        componentDidMount() {
            fetch("https://thediseasefighter.herokuapp.com/sessions", {
                method: "GET",
                headers: {
                    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyMzMxMTA1MiwianRpIjoiMDY2ZTRiNzQtNThhZS00NDYxLWE5OGMtYmJiNGRkMGMxN2MyIiwibmJmIjoxNjIzMzExMDUyLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxMSwiZXhwIjoxNjI1OTAzMDUyLCJpc19kb2N0b3IiOmZhbHNlfQ.rUsYN6gobInTXuy-0xIYIKxD8COJFzwn9BMdSH2PdAU`,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    this.setState({prevdata:data.previous_appointments,nextdata:data.future_appointments,currdata:data.current_appointments})
                })
                .catch((err) => console.log(err));
        }
        render(){
            const {activef,prevdata,nextdata,currdata}=this.state
            return(
                <div className='appointment-componant'>
                    <div className='appointment-header d-flex align-items-center'>
                        <h3>My Appointment</h3>
                        <div className='choose-appoint'>
                            <p className={activef?('active-appointment'):(null)} onClick={()=>this.setState({activef:true})}>Next Appointment</p>
                            <p className={activef?(null):('active-appointment')} onClick={()=>this.setState({activef:false})}>Prevoius Appointment</p>
                        </div>
                    </div>
                    <div className='appointments'>
                    {activef?(
                        <div>
                            {currdata?(
                                currdata.map((app)=> <div onClick={()=>this.props.history.replace({pathname:`/doctors`,state: { id: app.doctor_id,session_id:app.id,prev_id:app.period_id,update:true }})}><AppointmentInfo key={app.id}{...app}/></div>)
                            ):(null)}
                            {nextdata?(
                                nextdata.map((app)=> <div onClick={()=>this.props.history.replace({pathname:`/doctors`,state: { id: app.doctor_id,session_id:app.id,prev_id:app.period_id,update:true }})}><AppointmentInfo key={app.id}{...app}/></div>)
                            ):(null)}
                        </div>
                    ):(
                        <div>
                            {prevdata?(
                            prevdata.map((app)=> <div onClick={()=>this.props.history.replace({pathname:`/meeting`,state: { app:app}})}><AppointmentInfo key={app.id}{...app}/></div>)
                        ):(null)}
                        </div>
                    )}
                        
                    </div>
                </div>
            )
        }
    }
export default withRouter(Appointment);