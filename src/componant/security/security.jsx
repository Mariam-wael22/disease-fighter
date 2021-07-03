import React from 'react'
import './security.css'
import Date from '../date/date'
class Security extends React.Component{
    constructor(){
        super()
        this.state={
            old_password:'',
            new_password:'',
            avilabledates:[],
            dateOfweek:[]
        }
    }
    componentDidMount(){
        //get user data
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
                        console.log(data)
                        let dateOfweek=['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday']
                        data.current_user.available_dates.map((day)=>{
                            if(dateOfweek.includes(day)){
                                this.setState({avilabledates:this.state.avilabledates.concat(day),dateOfweek:this.state.dateOfweek.concat(day)})
                                }
                            else{
                                this.setState({avilabledates:this.state.avilabledates.concat(day)})
                                }
                        })
                      })
                      .catch((err) => console.log(err));
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
    }
    render(){
        const {avilabledates,dateOfweek,old_password,new_password}=this.state;
        console.log(avilabledates)
        console.log(dateOfweek)
        return(
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
                {!window.localStorage.getItem("doctor")?(null):(
                    <div>
                        <Date setState={state => this.setState(state)} dateOfweek={dateOfweek} avilabledates={avilabledates} isSetting={true}/>
                    </div>
                )}
                </div>
            </div>
        )
    }

}
export default Security;