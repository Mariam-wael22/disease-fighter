import React from 'react'
import { withRouter } from 'react-router-dom'
import './favourite.css'
import Navbar from '../../componant/navbar/navbar'
import Menu from '../../componant/menu/menu'
import '../../componant/globalstyle.css'


class Favourite extends React.Component{
    constructor(){
        super()
        this.state={
            favorites:null
        }
    }
    componentDidMount() {
        fetch("https://diseasefighter.pythonanywhere.com/favorites", {
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
                        this.setState({favourite:data.doctors})
                        
                    })
                    .catch((err) => console.log(err));
                }
                delete=(id)=>{
                    const {favourite}=this.state
                    const filter_fav=favourite.filter((obj)=>obj.id !== id)
                    this.setState({favourite:filter_fav})
                    fetch(`https://diseasefighter.pythonanywhere.com/doctors/${id}/favorite`, {
                        method: 'DELETE',
                        headers: {
                        Authorization: `Bearer ${window.localStorage.getItem(
                            "token"
                        )}`,
                            "Content-Type": "application/json",
                        },
                    })
                        .then((res) => res.json())
                        .then((data) => {
                            console.log(data);
                            
                            })
                        .catch((err) => {console.log(err)});
                }
    render(){
        const {favourite}=this.state
        console.log(favourite)
        return(
            <div>
                <Navbar />
                <div className='d-flex'>
                    <Menu />
                    <div className='main-container justify-content-center col-lg-10 col-md-10'>
                    <div className='favourite d-flex'>
                        {favourite?(
                            favourite.map((fav)=>(
                                <div className='favourite-componant'>
                                <div className='d-flex justify-content-center align-items-center mt-2'>
                                    <img className='col-3' src={fav.avatar} alt="doctor img" />
                                    <div className='col-8'>
                                        <p>{fav.name}</p>
                                        <p>{fav.clinic_location}</p>
                                    </div>
                                </div>
                                <div className='d-flex align-items-center mt-2'>
                                    <svg style={{color: 'red'}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart-fill love col-4" viewBox="0 0 16 16" onClick={()=>this.delete(fav.id)}>
                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                    </svg>
                                    <button className='btn active' onClick={()=>this.props.history.replace({pathname:`/doctors/${fav.id}`})}>Book Appointment</button>
                                </div>
                            </div>
                            ))
                        ):(null)}
                        
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Favourite);