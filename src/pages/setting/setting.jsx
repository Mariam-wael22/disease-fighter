import React from 'react'
import './setting.css'
import Navbar from '../../componant/navbar/navbar'
import Menu from '../../componant/menu/menu'
import Date from '../../componant/date/date'
import '../../componant/globalstyle.css'

class Setting extends React.Component{
    constructor(){
        super()
        this.state={
            activef:true,
            name:null,
            old_password:'',
            new_password:'',
            location:'',
            phone:'',
            gender:null,
            about:'',
            avatar:null,
            avatarimg:null,
            avilabledates:[],
            dateOfweek:[]
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
                        let dateOfweek=['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']
                        data.current_user.available_dates.map((day)=>{
                            if(dateOfweek.includes(day)){
                                this.setState({avilabledates:this.state.avilabledates.concat(day),dateOfweek:this.state.dateOfweek.concat(day)})
                            }
                            else{
                                this.setState({avilabledates:this.state.avilabledates.concat(day)})
                            }
                        })
                        var obj=data.current_user
                        this.setState({name:obj.name,location:obj.location,phone:obj.phone,about:obj.about,avatar:obj.avatar,avatarimg:obj.avatar,email:obj.email,gender:obj.gender})
                          
                      })
                      .catch((err) => console.log(err));
                    }
        Submitavatar =()=>{
            console.log(this.state.avatar)
            var data = new FormData()
            data.append('file', this.state.avatar)
            data.append('key', '123')
            console.log(data)
            fetch('https://thediseasefighter.herokuapp.com/avatar', {
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
                alert(data.message)
            })
            .catch(error => {
                console.error(error)
            })
        }
        Submit =()=>{ 
            const {name,location, phone, gender,about}=this.state;
            const data={'name':name,'location':location,'clinic_location':location,'phone':phone,'gender':gender, 'about':about};
            fetch("https://thediseasefighter.herokuapp.com/user", {
              method: "PATCH",
              body: JSON.stringify(data),
              headers: {
                Authorization: `Bearer ${window.localStorage.getItem(
                    "token"
                )}`,
                  "Content-Type": "application/json",
              },
          })
              .then((res) => res.json())
              .then((data) => {
                alert(data.message)
                  })
              .catch((err) => {console.log(err)});
           }
           handleChange = event => {
            const { value, name } = event.target;
        
            this.setState({ [name]: value });
          };
          changepass=()=>{
            const data={
             current_password:this.state.old_password,
             new_password:this.state.new_password
         }
         fetch("https://thediseasefighter.herokuapp.com/password", {
             method: "PATCH",
             body: JSON.stringify(data),
             headers: {
               Authorization: `Bearer ${window.localStorage.getItem(
                   "token"
               )}`,
                 "Content-Type": "application/json",
             },
         })
             .then((res) => res.json())
             .then((data) => {
                alert(data.message)
                 })
             .catch((err) => {console.log(err)});
        }
    render(){
        const {activef,avatarimg,name,avilabledates,dateOfweek,old_password,new_password,about,location,phone,gender}=this.state;
        return(
            <div className='setting'>
                {console.log(avilabledates)}
                <Navbar />
                    <div className='d-flex'>
                        <Menu />
                        <div className='main-container col-lg-10 col-md-10'>
                            <div className='more-setting col-lg-2 col-md-2'>
                            <div onClick={()=>this.setState({activef:true})}><p className={activef?('active'):(null)}>Edit Profile</p></div>
                        <div onClick={()=>this.setState({activef:false})}><p className={activef?(null):('active')}>Password & Security</p></div>
                            </div>
                            {activef?(
                                <div className='main-setting col-lg-5 col-md-5'>
                                    <div className='p-3'>
                                    <div className='update-img'>
                                        <div className='position-relative update-img2'>
                                        <img src={avatarimg} className='update-avatar' alt="avatar" />
                                        <label htmlFor="updateimg"><i class="fa fa-camera"></i></label>
                                        </div>
                                <input id="updateimg" className='file d-none' type="file" accept="image/*" multiple = "false" onChange={(e)=>(this.setState({avatar:e.target.files[0],avatarimg:URL.createObjectURL(e.target.files[0])}))}/>
                                <button className='btn active-btn' onClick={this.Submitavatar}>Upload Image</button>
                            </div>

                                    <div class="mb-2">
                            <label>Name</label>
                            <input type="text" name='name' value={name} class="form-control shadow p-2 rounded" onChange={this.handleChange} required/>
                         </div>
                            <div class="mb-1">
                                <label>Location</label>
                                <input type="text" name='location' value={location} class="form-control shadow p-2 rounded" onChange={this.handleChange} required/>
                            </div>
                            <div class="mb-1">
                                <label>Phone Number</label>
                                <input type="number" value={phone} name='phone' class="form-control shadow p-2 rounded" onChange={this.handleChange} required/>
                            </div>
                            <div class="mb-1">
                                <label>Gender</label>
                                <select name='gender' value={gender} class="form-control form-select shadow p-2 rounded" onChange={this.handleChange} required>
                                        <option selected disabled value="">Select Gender</option>
                                         <option >Male</option>
                                         <option >Female</option>
                                    </select>
                            </div>
                            <div class="mb-1">
                                <label>About</label>
                                <textarea value={about} name='about' class="form-control shadow p-2 rounded" onChange={this.handleChange} required/>
                            </div>
                            <div className='d-flex justify-content-center align-items-center'>
                                <p className='btn active-btn' onClick={this.Submit}>Save Change</p>
                            </div>
                                    </div>
                                </div>
                            ):(
                                <div className='security-setting col-lg-5 col-md-5'>
                                    <div className='p-3'>
                                    <div class="mb-1">
                                        <label>Current Password</label>
                                        <input type="password" name='old_password' value={old_password} class="form-control shadow p-2 rounded" onChange={this.handleChange} />
                                    </div>
                                    <div class="mb-1">
                                        <label>New Password</label>
                                        <input type="password" name='new_password' value={new_password} class="form-control shadow p-2 rounded" onChange={this.handleChange} />
                                    </div>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <p className='btn active-btn mb-0' onClick={this.changepass}>Save Change</p>
                                    </div>
                                    <div>
                                    <Date setState={state => this.setState(state)} dateOfweek={dateOfweek} avilabledates={avilabledates} isSetting={true}/>
                                    </div>
                                    </div>
                                </div>
                            )}
                            
                        </div>
                    </div>
            </div>
        )
    }
}
export default Setting;