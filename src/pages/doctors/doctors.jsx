import React from 'react'
import {withRouter} from 'react-router-dom'
import './doctors.css'
import Navbar from '../../componant/navbar/navbar'
import Menu from '../../componant/menu/menu'
import DoctorInfo from '../../componant/doctor-info/doctor-info'
import Session from '../../componant/session/session'
import Spinner from '../../componant/spinner/spinner'
import '../../componant/globalstyle.css'

class Doctors extends React.Component{
    constructor(props){
        super(props)
        this.state={
            all_doctors:null,
            favorites:null,
            about_flag:props.location.state?(props.location.state.update?(false):(true)):(true)
        }
    }
    componentDidMount() {                    
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
                var fav={}
                data.doctors.map((favorite)=>fav[favorite.id]=favorite.is_in_favorite_list)
                this.setState({all_doctors:data.doctors,favorites:fav})
            })
            .catch((err) => console.log(err));
        }
        
    render(){
        var id=1
        var data=null
        const {all_doctors,about_flag,favorites}=this.state
        if(this.props.match.params){
            id=parseInt(this.props.match.params.id)
        }
        if(all_doctors){
            data=all_doctors.filter((obj)=>{return obj.id === id})
        } 
        return(
            <div className='doctors'>
                <Navbar />
                    <div className='d-flex'>
                        <Menu />
                        <div className='main-container col-lg-10 col-md-10'>
                            <div className='row justify-content-between'>
                            <div className='all-doctors d-none d-md-block d-lg-block'>
                                <h3>All Doctors</h3>
                                <div className='all-doctors2'>
                                {all_doctors?(
                                    all_doctors.map((doctor)=>(
                                        <div onClick={()=>this.setState({about_flag:true})}>
                                            <DoctorInfo {...doctor}/>
                                        </div>
                                    ))
                                ):(
                                    <Spinner />
                                )}
                                </div>
                            </div>
                            <div className='appointment'>
                                {
                                    data?(
                                        <Session data={data[0]} about_flag={about_flag} favorites={favorites}  setState={state => this.setState(state)}/>
                                    ):(<Spinner />)
                                }
                            </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
}
export default withRouter(Doctors)