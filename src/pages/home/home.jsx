import React from 'react'
import './home.css'
import Navbar from '../../componant/navbar/navbar'
import Menu from '../../componant/menu/menu'
import DoctorInfo from '../../componant/doctor-info/doctor-info'
import Appointment from '../../componant/appointment/appointment'
import DcotorHome from '../../componant/doctor-home/doctor-home'
import Spinner from '../../componant/spinner/spinner'
import '../../componant/globalstyle.css'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

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
            name:null,
            active_res:false,
            error:''
        }
        }
        componentDidMount() {
            fetch("https://diseasefighter.pythonanywhere.com/specializations", {
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


            fetch("https://diseasefighter.pythonanywhere.com/doctors/top", {
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
                    console.log(window.localStorage.getItem(
                        "token"
                    ))
                    console.log(data)
                    this.setState({top_doctors:data.top_doctors})
                })
                .catch((err) => console.log(err));

            fetch("https://diseasefighter.pythonanywhere.com/doctors", {
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



            fetch("https://diseasefighter.pythonanywhere.com/sessions", {
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


        fetch("https://diseasefighter.pythonanywhere.com/user", {
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
        uploadModel=(e)=>{
            var modelname=this.state.catigory.toLowerCase()
            if(modelname==='chest'){
                modelname='covid19'
            }
            this.setState({active_res:true,prediction_result:[],error:''})
            const file=e.target.files[0]
            const formData = new FormData();
            formData.append("file",file);
            console.log(formData);
            fetch(
                `https://diseasefighter.pythonanywhere.com/model/${modelname}`,
                {
                    method: "POST",
                    body: formData,
                    mode: "cors",
                    headers: {
                        Authorization: `Barer ${window.localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if(data.prediction_result){
                        this.setState({prediction_result:data.prediction_result})
                    }
                    else{
                        this.setState({error:data.message})
                    }
                })
                .catch((err) => {
                    this.setState({error:"The server's Model is not working"})
                });
        }
        render(){
            const {specializations,error,prediction_result, active_res , top_doctors,all_doctors,active_alldoctor,catigory,data,name}=this.state
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
                                        {catigory?(
                                            <div>
                                                <p className='btn active' onClick={()=>this.setState({catigory:'',active_res:false,error:''})}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left me-1" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                                                    <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                                                </svg>
                                                Go Back</p>
                                                <div className='model'>
                                                    {!active_res?(
                                                        <div className="drag-area" >
                                                        <br />
                                                        <label htmlFor='model' className='d-flex flex-column justify-content-center align-items-center'>
                                                        <div className="icon" htmlFor='model'><i class="fa fa-upload"></i></div>
                                                            Drop Your Files Here</label>
                                                        <input type="file" id='model' hidden onChange={this.uploadModel}/>
                                                    </div>
                                                    ):(<div className='Circular-container'>
                                                        {prediction_result.length?(prediction_result.map((pred)=>(
                                                            <div className='test'>
                                                            <CircularProgressbarWithChildren value={pred.percentage}>
                                                            <p className='pred'>{pred.percentage}%</p>
                                                                <p>{pred.type}</p>
                                                            </CircularProgressbarWithChildren>
                                                        </div>
                                                        ))):(<div>
                                                            {error?(<p>{error} Please go back and try again</p>):(
                                                                <div>
                                                                    <p>Please Wait</p>
                                                                    <Spinner />
                                                                </div>
                                                            )}
                                                        </div>)}
                                                        
                                                       </div>)}
                                                </div>
                                            </div>
                                        ):(
                                            <div>
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
                                        )}
                                        
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