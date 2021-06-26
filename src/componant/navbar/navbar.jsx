import React from 'react';
import './navbar.css'
import '../globalstyle.css'
import logoimg from '../../image/logo.png'
import Logout from '../logout/logout';
import SmallMenu from '../small-menu/small-menu'
import Notification from '../notification/notification';
import Search from '../search/search'
import {Link} from 'react-router-dom'

class Navbar extends React.Component{
    constructor(){
        super()
        this.state={
          active_notifi:false,
          active_logout:false,
          active_toggle:false,
          all_doctors:null,
          userdata:null,
          notifidata:[],
            num:null
        }
    }
    componentDidMount(){
      //get user data
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
                        this.setState({userdata:data.current_user})
                        
                    })
                    .catch((err) => console.log(err));


      //get all doctor to using it search
      fetch("https://thediseasefighter.herokuapp.com/doctors", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${window.localStorage.getItem(
                  "token"
              )}`,
              "Content-Type": "application/json",
          }
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({all_doctors:data.doctors})
            })
            .catch((err) => console.log(err));



      //get notification data
      fetch("https://thediseasefighter.herokuapp.com/notifications", {
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
          let num=0
          data.notifications.map((notifi)=>{
              if(!notifi.seen){
                  num +=1
              }
          })
          if(num===0){
              num=null
          }
          this.setState({notifidata:data.notifications,num:num})
          
      })
      .catch((err) => console.log(err));
    }
    render(){
      const { active_notifi,active_logout,active_toggle,all_doctors,userdata,notifidata , num}=this.state
        return(
          <div>
          <nav>
            <div className='container1 d-flex align-items-center'>
            <div className='logo col-lg-3 col-md-3 col-sm-6'>
              <Link to='/'>
              <img src={logoimg} alt="Logo" />
              </Link>
                </div>
                <div className='search position-relative d-none d-md-block d-lg-block col-lg-5 col-md-5 col-sm-5'>
                  <Search all_doctors={all_doctors}/>
                  </div>
                
                <div className='profile position-relative col-lg-4 col-md-5 col-sm-1 d-flex justify-content-center'>
                  <div className={`notifi-icon position-relative me-2 ${active_notifi?('active-notifi'):(null)}`} onClick={()=>this.setState({active_notifi:!active_notifi,active_logout:false,active_toggle:false})}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
                      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                    </svg>
                    <p className='num-notifi position-absolute '>{this.state.num}</p>
                  </div>
                  {active_notifi?(
                    <div className='notifi-data'>
                      <Notification notifidata={notifidata} setState={(state)=>this.setState(state)} num={num}/>
                    </div>
                  ):(null)}
                  {active_logout?(
                    <div className='logout-data'>
                      <div className='h-50 bg-white border-bottom p-3 d-flex'>
                        <div>
                        <img src={userdata?(userdata.avatar):(null)} alt="avatar"/>
                        </div>
                        <div>
                        <p className='m-0 me-2'>{userdata?(userdata.name):(null)}</p>
                        <label>See Your Profile</label>
                        </div>
                      </div>
                      <div className='h-50 bg-white p-3'>
                        <Logout />
                      </div>

                    </div>
                  ):(null)}
                  <div className='d-none d-md-block d-lg-block'>
                  <div className='logout d-flex align-items-center' onClick={()=>this.setState({active_logout:!active_logout,active_notifi:false})}>
                    <img src={userdata?(userdata.avatar):(null)} alt="avatar"/>
                    <div className='d-flex align-items-center'>
                    <p className='m-0 me-2'>{userdata?(userdata.name):(null)}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16" className='mt-1'>
                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    </div>
                  </div>
                  </div>
                </div>
                <div className='d-lg-none d-md-none nav-toggle' onClick={()=>this.setState({active_toggle:!active_toggle,active_notifi:false})}>
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
                </div>
            </div>
            </nav>
            <div>
              <div className='search d-lg-none d-md-none ms-2 me-2'>
              <Search all_doctors={all_doctors}/>
              </div>
            </div>
            {active_toggle?(
              <div className='active-toggle position-absolute'>
              <SmallMenu />
              <Logout />
            </div>
            ):(null)}
            </div>
        )
    }
}
export default Navbar;