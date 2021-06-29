import React from 'react'
import { withRouter } from 'react-router-dom'
import './notification.css'

class Notification extends React.Component{
    constructor(props){
        super(props)
        this.state={
            notifidata:this.props.notifidata
        }
    }
    deleteTask(id) {
        const remain_data=this.state.notifidata.filter((obj)=>{return obj.session_id !== id})
        this.setState({notifidata:remain_data});  
        fetch(`https://diseasefighter.pythonanywhere.com/notifications/${id}`, {
                                method: "PATCH",
                                body: JSON.stringify({
                                    "type": "delete"
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
                                    if(data.message==='You have delete the notification'){
                                        let num =this.props.num
                                        if(num===1 || num ==null){
                                            num=null
                                        }
                                        else{
                                            num -=1
                                        }
                                        this.props.setState({num:num})
                                        this.props.setState({notifidata:remain_data}) 
                                    }
                                       
                                })
                                .catch((err) => console.log(err));
        }
        seen_notifi(notifi){
            fetch(`https://diseasefighter.pythonanywhere.com/notifications/${notifi.session_id}`, {
                                method: "PATCH",
                                body: JSON.stringify({
                                    "type": "update"
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
                                    this.props.history.replace({pathname:`/review`,state: { notifi:notifi}})
                                       
                                })
                                .catch((err) => console.log(err));
        }
    render(){
        const {notifidata}=this.state
        return(
            <div className='notification h-100'>
                <h3 className='mb-3 mt-3'>Notification</h3>
                <div className='new'>
                    <div className='notification-content'>
                        {notifidata.map((notifi)=>
                        <div className={`notification-componant ${notifi.seen?('seen'):('unseen')} d-flex align-items-center`}>
                        <div>
                        <img src={notifi.doctor_avatar} alt="avatar"/>
                        </div>
                        <div className='content'onClick={()=>this.seen_notifi(notifi)}>
                        <p>Dr. {notifi.doctor_name} finished his session with you can rate it now</p>
                        <label>{notifi.time}</label>
                        </div>
                        <div className='icon' onClick={()=>this.deleteTask(notifi.session_id)}>
                        <i class="fa fa-times"></i>
                        </div>
                        </div>
                        )}
                        
                    </div>
                </div>
            </div>
            
        )
    }
}
export default withRouter(Notification);