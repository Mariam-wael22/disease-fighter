
import React from 'react'
import './session.css'
import {withRouter} from 'react-router-dom'
import '../../componant/globalstyle.css'
import BookingInfo from '../booking-info/booking-info'


class Session extends React.Component{
    constructor(props){
        super(props)
        this.state={
            is_favorite:this.props.favorites
        }
    }
    changecolor=()=>{
        const {is_favorite}=this.state
        let id =this.props.data.id
        let fav=is_favorite[id]
        this.setState(prevState => {
            let is_favorite = Object.assign({}, prevState.is_favorite);  // creating copy of state variable jasper
            is_favorite[id] = !fav;                     // update the name property, assign a new value                 
            return { is_favorite };                                 // return new object jasper object
          })
          console.log(id)
          fetch(`https://thediseasefighter.herokuapp.com/doctors/${id}/favorite`, {
            method: `${fav?('DELETE'):('POST')}`,
            body: JSON.stringify({
                "is_in_favorite_list":true
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
                
                })
            .catch((err) => {console.log(err)});
    }
    render(){
        const {data,about_flag,setState}=this.props
        const {is_favorite} =this.state
        var list=[]
        if(data){
            var index=data.reviews.rates
            for (let i=1; i<=5;i++) {
                if(i<=index){
                    list.push(<i className="fa fa-star rating"></i>)
                }
                else{
                    list.push(<i className="fa fa-star"></i>)
                }
            }
        }
        return(
           <div>
                {data?(
                <div>
                  {about_flag?(
                      <div>
                      <div className='doctor-avatar d-flex justify-content-center align-items-center'>
                      <img src={data.avatar} alt='doctor avatar'/>
                  </div>
                  <div className='doctor-main-data d-flex flex-column justify-content-center align-items-center'>
                      <h3 className='mb-0'>{data.name}</h3>
                      <p className='mb-0'>{!data.specialization?(null):(data.specialization.name)}</p>
                      <p className='mb-0'>{data.clinic_location}</p>
                  </div>
                  <div className='alldoctor-data'>
                      <div className='d-flex'>
                          <div className='col-9 about'>
                              <h3 className='mb-0 fs-4'>About</h3>
                              <p className='mb-0'>{data.about}</p>
                          </div>
                          <div className='col-3 stars'>
                          {list}
                          </div>
                      </div>
                      <div className='d-flex flex-column justify-content-center align-items-center mt-2 mb-3'>
                          {data.available_dates.map((date)=>(
                              <div className='dates'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-alarm-fill col-1" viewBox="0 0 16 16">
                                      <path d="M6 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H9v1.07a7.001 7.001 0 0 1 3.274 12.474l.601.602a.5.5 0 0 1-.707.708l-.746-.746A6.97 6.97 0 0 1 8 16a6.97 6.97 0 0 1-3.422-.892l-.746.746a.5.5 0 0 1-.707-.708l.602-.602A7.001 7.001 0 0 1 7 2.07V1h-.5A.5.5 0 0 1 6 .5zm2.5 5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5zM.86 5.387A2.5 2.5 0 1 1 4.387 1.86 8.035 8.035 0 0 0 .86 5.387zM11.613 1.86a2.5 2.5 0 1 1 3.527 3.527 8.035 8.035 0 0 0-3.527-3.527z"/>
                                  </svg>
                                  <p className='col-11'>{date.day} ,{date.start_time} - {date.end_time} </p>
                              </div>
                          ))}
                      </div>
                      <div className='d-flex justify-content-center align-items-center active-session'>
                          <div>
                          <svg style={{color: `${is_favorite?(is_favorite[data.id]?('red'):('')):('')}`}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart-fill me-2 love" viewBox="0 0 16 16" onClick={this.changecolor}>
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                          </svg>
                          </div>
                          <div>
                              <p className='btn active shadow p-2 w-100 rounded mb-0' onClick={()=>setState({about_flag:false})}>Book Appointment</p>
                          </div>
                      </div>
                  </div>
                      </div>
                  ):(
                    <BookingInfo id={data.id}/>

                  )}  
            </div>
            ):(null)}
           </div>
        )
    }
}
export default withRouter(Session)