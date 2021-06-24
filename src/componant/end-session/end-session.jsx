import {React,useState} from 'react'
import './end-session.css'
import {useLocation,useHistory} from 'react-router-dom'
import Docu from '../../image/Docu-diag.png'
import Img from '../../image/img-diag.png'

const EndSession=()=>{
    const location =useLocation()
    const history=useHistory()
    const [start,setStart]=useState(false)
    const [Diagnosis,setDiagnosis]=useState('')
    const [Medicines,setMedicines]=useState('')
    const [Doc,SetDoc]=useState(null)
    const [Image,SetImage]=useState(null)
    var session_info=null

    if(location.state){
        session_info=location.state.session_info
    }
    const EndMeeting=()=>{
        const diag={'diagnosis':Diagnosis,'medicines':Medicines}
        fetch(`https://thediseasefighter.herokuapp.com/sessions/${session_info.id}`, {
            method: "PATCH",
            body: JSON.stringify(diag),
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
                })
            .catch((err) => {console.log(err)});

            var data = new FormData()
            data.append('file', Doc)
            data.append('file', Image)
            data.append('key', '123')
            console.log(data)
            fetch(`https://thediseasefighter.herokuapp.com/sessions/${session_info.id}/files`, {
              method: 'PATCH',
              body: data,
              headers: {
                              Authorization: `Bearer ${window.localStorage.getItem(
                                  "token"
                      )}`
              }
            })
            .then(response => response.json())
            .then(data => {
              console.log(data)
              history.push('/home')
            })
            .catch(error => {
              console.error(error)
            })
    }
    return(
        <div className='d-flex justify-content-center'>
            {session_info?(
                <div className='session_info col-5'>
                    <div className='first'>
                        <div className='d-flex justify-content-center first-img'>
                            <img src={session_info.patient_avatar} alt='doctor avatar'/>
                        </div>
                        <div className='d-flex flex-column align-items-center mt-2'>
                            <h5 className='m-0'>{session_info.name}</h5>
                        </div>
                        {!start?(<div>
                            <div class="mb-1 mt-2">
                            <label>About</label>
                            <textarea class="form-control shadow p-2 rounded" value={session_info.comment} readOnly/>
                        </div>

                        <div class="mb-1">
                            <label>Diagnosis</label>
                            <textarea class="form-control shadow p-2 rounded" value={session_info.diagnosis} readOnly/>
                        </div>
                        <div class="mb-1">
                            <label>Medicines</label>
                            <textarea class="form-control shadow p-2 rounded" value={session_info.medicines} readOnly/>
                        </div>
                        <div class="mb-1">
                            <label>Phone</label>
                            <input type='text' class="form-control shadow p-2 rounded" value={session_info.phone} readOnly/>
                        </div>
                        <div class="mb-1 d-flex">
                           <div className='w-50 me-2'>
                                <label>Gender</label>
                                <input type='text' class="form-control shadow p-2 rounded" value={session_info.gender} readOnly/>
                           </div>
                           <div className='w-50'>
                                <label>Date</label>
                                <input type='text' class="form-control shadow p-2 rounded" value={session_info.date} readOnly/>
                           </div>
                        </div>
                        <div className='mt-3 d-flex justify-content-center align-items-center'>
                            <button className='btn delete danger shadow p-2 w-50 rounded'>Delete</button>
                            <button className='btn active shadow p-2 w-50 rounded' onClick={()=>setStart(true)}>Satrt Meeting</button>
                        </div>
                        </div>):(<div>
                            <div class="mb-1">
                            <label>Diagnosis</label>
                            <textarea class="form-control shadow p-2 rounded" onChange={(e)=>setDiagnosis(e.target.value)}/>
                        </div>
                        <div class="mb-1">
                            <label>Medicines</label>
                            <textarea class="form-control shadow p-2 rounded" onChange={(e)=>setMedicines(e.target.value)}/>
                        </div>
                        <div class="mb-1 mt-3">
                            <label>Files</label>
                            <div className='d-flex files'>
                                <label htmlFor='diagf1'><img src={Docu} alt="" className='diag-img'/></label>
                                <label htmlFor='diagf2'><img src={Img} alt="" className='diag-img'/></label>
                            </div>
                                <input type='file' id='diagf1' className='d-none' onChange={(e)=>SetDoc(e.target.files[0])}/>
                                <input type='file' id='diagf2' className='d-none' onChange={(e)=>SetImage(e.target.files[0])}/>
                        </div>
                        <div className='mt-3 d-flex justify-content-center align-items-center'>
                            <button className='btn active shadow p-2 w-50 rounded' onClick={EndMeeting}>End Meeting</button>
                        </div>
                        </div>)}
                        
                    </div>
                </div>
            ):(null)}
        </div>
    )
}
export default EndSession;