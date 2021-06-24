import React from 'react'
import './home.css'
import Navbar from '../../componant/navbar/navbar'
import Menu from '../../componant/menu/menu'
import DoctorInfo from '../../componant/doctor-info/doctor-info'
import Appointment from '../../componant/appointment/appointment'
import DcotorHome from '../../componant/doctor-home/doctor-home'
import Spinner from '../../componant/spinner/spinner'
import '../../componant/globalstyle.css'

class Home extends React.Component{
    constructor(){
        super()
        this.state={
            specializations:null,
            top_doctors:null,
            all_doctors:null,
            active_alldoctor:false,
            catigory:'',
            data:null,
            name:null
        }
        }
        componentDidMount() {
            fetch("https://thediseasefighter.herokuapp.com/specializations", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(data)
                            this.setState({specializations:data.specializations})
                            
                        })
                        .catch((err) => console.log(err));


            fetch("https://thediseasefighter.herokuapp.com/doctors/top", {
                method: "GET",
                headers: {
                    Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYyMzMxMTA1MiwianRpIjoiMDY2ZTRiNzQtNThhZS00NDYxLWE5OGMtYmJiNGRkMGMxN2MyIiwibmJmIjoxNjIzMzExMDUyLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxMSwiZXhwIjoxNjI1OTAzMDUyLCJpc19kb2N0b3IiOmZhbHNlfQ.rUsYN6gobInTXuy-0xIYIKxD8COJFzwn9BMdSH2PdAU`,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(window.localStorage.getItem(
                        "token"
                    ))
                    console.log(data)
                    this.setState({top_doctors:data.top_doctors})
                })
                .catch((err) => console.log(err));

            fetch("https://thediseasefighter.herokuapp.com/doctors", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${window.localStorage.getItem(
                        "token"
                    )}`,
                    "Content-Type": "application/json",
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    this.setState({all_doctors:data.doctors})
                })
                .catch((err) => console.log(err));



                fetch("https://thediseasefighter.herokuapp.com/sessions", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem(
                    "token"
                )}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                this.setState({data:data})
            })
            .catch((err) => console.log(err));


        fetch("https://thediseasefighter.herokuapp.com/user", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem(
                    "token"
                )}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({name:data.current_user.name})

            })
            .catch((err) => console.log(err));
            
        }
        render(){
            const {specializations, top_doctors,all_doctors,active_alldoctor,catigory,data,name}=this.state
            var spec_data
            if(all_doctors){
             spec_data=this.state.all_doctors.filter((obj)=>{return obj.specialization.name === catigory})
            }
            return(
                <div className='home'>
                    <Navbar />
                    <div className='d-flex'>
                        <Menu />
                        <div className='main-container col-lg-10 col-md-10'>
                            {!window.localStorage.getItem("doctor")?(
                                <div className='row justify-content-between'>
                                <div className='left'>
                                    <div className='categorie'>
                                        <h3>Categories</h3>
                                        <div className='categorie-img'>
                                            {
                                                specializations?(
                                                    specializations.map((specialization)=>(
                                                        <img src={specialization.image} alt="" onClick={()=>this.setState({catigory:specialization.name})}/>
                                                    ))
                                                ):(
                                                    <Spinner />
                                                )
                                            }
                                        </div>
                                    </div>
                                    <div>
                                    <Appointment />
                                    </div>
                                </div>
                                <div className='right'>
                                    <div>
                                    <div className='d-flex top-doctor'>
                                    <h3 >{catigory?(`${catigory} Doctors`):(active_alldoctor?('All Doctors'):('Top Doctors'))}</h3>
                                    <p className='d-lg-none d-md-none' onClick={()=>this.setState({active_alldoctor:!active_alldoctor,catigory:''})}>{active_alldoctor?('View Top'):('View All')}</p>
                                    </div>
                                    <div className='top-doctor-content'>
                                        {catigory?(
                                            spec_data?(
                                                spec_data.map((doc)=>(
                                                    <DoctorInfo {...doc}/>
                                                ))
                                            ):(<Spinner />)
                                        ):(
                                            active_alldoctor?(
                                                all_doctors?(
                                                    all_doctors.map((doc)=>(
                                                        <DoctorInfo {...doc}/>
                                                    ))
                                                ):(<Spinner />)
                                            ):(
                                                top_doctors?(
                                                    top_doctors.map((doc)=>(
                                                        <DoctorInfo {...doc}/>
                                                    ))
                                                ):(<Spinner />)
                                            )
                                        )}
                                    </div>
                                    </div>
                                
                                </div>
                            </div>
                            ):(<DcotorHome data={data} name={name} />)}
                        </div>
                    </div>
                </div>
            )
        }

}
export default Home