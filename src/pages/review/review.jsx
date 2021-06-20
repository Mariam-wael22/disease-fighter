import {React,useState} from 'react'
import {useLocation,useHistory} from 'react-router-dom'
import './review.css'
import '../../componant/globalstyle.css'
import Navbar from '../../componant/navbar/navbar'
import Menu from '../../componant/menu/menu'

const Review =()=>{
    const location =useLocation()
    const history=useHistory()
    const [comment,setcomment]=useState('')
    const [stars,setstars]= useState(0)
    var index=0
    var notifi=null
    let list=[]

    if(location.state){
        notifi=location.state.notifi
    }
    if(stars){
        index=stars
    }
    for (let i=1; i<=5;i++) {
        if(i<=index){
            list.push(<i className="fa fa-star rating" onClick={()=>setstars(stars===1?(0):(i))}></i>)
        }
        else{
            list.push(<i className="fa fa-star" onClick={()=>setstars(i)}></i>)
        }
      }

      const addReview=()=>{
          console.log(comment)
          console.log(stars)
        fetch(`https://thediseasefighter.herokuapp.com/sessions/${notifi.session_id}/reviews`, {
          method: "POST",
          body: JSON.stringify({ 
            "comment":comment, 
            "stars":stars 
            }),
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
              if(data.success){
                history.push('/home')
              }
              
              })
          .catch((err) => {console.log(err)});
    }
    return(
        <div>
            <Navbar />
            <div className='d-flex'>
                <Menu />
                <div className='main-container d-flex justify-content-center col-lg-10 col-md-10'>
                    <div className='review col-5'>
                        {notifi?(
                            <div>
                                <div className='d-flex justify-content-center'>
                                    <img src={notifi.doctor_avatar} alt='doctor avatar'/>
                                </div>
                                <div className='d-flex flex-column align-items-center mt-2'>
                                    <h5 className='m-0'>Dr. {notifi.doctor_name}</h5>
                                    <p className='m-0'>{notifi.location}</p>
                                    <p className='m-0'>{notifi.specialization}</p>
                                </div>
                                {notifi.diagnosis?(
                                    <div className='d-flex flex-column align-items-center mt-1 mb-3'>
                                    <p className='m-0'>Dr. {notifi.doctor_name} Diagnosed you with {notifi.diagnosis}</p>
                                </div>
                                ):(null)}

                                <div className='d-flex justify-content-center mt-2 mb-2'>
                                    {list}
                                </div>

                                <div class="mb-1">
                                <textarea class="form-control shadow p-2 rounded" placeholder='Leave Your Comment here' onChange={(e)=>setcomment(e.target.value)}/>
                                </div>
                                <div class="mt-2 d-flex justify-content-center">
                                <p className='btn active' onClick={addReview}>Save Your Review</p>
                                </div>
                            </div>
                        ):(
                            null
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Review