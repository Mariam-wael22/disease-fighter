import {React,useState} from 'react'
import './search.css'
import DoctorInfo from '../doctor-info/doctor-info'
const Search=({all_doctors})=>{
  const [search,setsearch]=useState('')
  var filterdoctor=null
  /*
  if(all_doctors){
    filterdoctor = all_doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(search.toLowerCase())
      )
  }*/
    return(
        <div className='position-relative'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search position-absolute" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                  <input type='search' placeholder='Search Doctor' className='form-control border-0 shadow-sm rounded ps-5' onChange={(e)=>setsearch(e.target.value)}/>
                  {search?(
                    <div className='search-data position-absolute'>
                      {filterdoctor?(
                        filterdoctor.map((doc)=>(
                          <DoctorInfo {...doc}/>
                        ))
                      ):(null)}
                      </div>):(null)}
                      
        </div>
    )
}
export default Search