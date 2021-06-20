import React from 'react'
import {useHistory} from 'react-router-dom'
import './doctor-info.css'
import '../globalstyle.css'

const DoctorInfo=({avatar,name,id,specialization,clinic_location,about,reviews,...props})=>{
    const history =useHistory()
    var index=reviews.rates
    let list=[]
    for (let i=1; i<=5;i++) {
        if(i<=index){
            list.push(<i className="fa fa-star rating"></i>)
        }
        else{
            list.push(<i className="fa fa-star"></i>)
        }
      }
    return(
        <div className='doctor-info d-flex align-items-center ' onClick={()=>history.replace({pathname:`/doctors`,state: { id: id}})}>
            <div className='avatar col-lg-2 col-md-3 col-sm-2'>
                <img src={avatar} alt="Doctor Avatar" />
            </div>
            <div className='data col-lg-7 col-md-6 col-sm-7'>
                <h3>{name}</h3>
                <p>specialization: {specialization?(specialization.name):(null)}</p>
                <div className='more-data'>
                <p>{clinic_location?(clinic_location):(null)}</p>
                <p>{about?(about):(null)}</p>
                </div>
            </div>
            <div className='rating col-lg-3 col-md-4 col-sm-3'>
                {list}
            </div>
        </div>
    )
}
export default DoctorInfo