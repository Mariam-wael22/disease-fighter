import React from 'react'
import './model.css'
import '../../componant/globalstyle.css'
import Navbar from '../../componant/navbar/navbar'
import Menu from '../../componant/menu/menu'
import Spinner from '../../componant/spinner/spinner'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


class Model extends React.Component{
    constructor(){
        super()
        this.state={
            active_res:false,
            prediction_result:[],
            error:'',
            catigory:'brain'
        }
    }
    componentDidMount(){
        fetch("http://diseasefighter.pythonanywhere.com/user", {
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
                if(data.specialization.name){
                    this.setState({catigory:data.specialization.name})
                }

            })
            .catch((err) => console.log(err));
    }
    uploadModel=(e)=>{
        var modelname=this.state.catigory.toLowerCase()
            if(modelname==='chest'){
                modelname='covid19'
            }
            this.setState({active_res:true,prediction_result:[],error:''})
            const file=e.target.files[0]
            const formData = new FormData();
            formData.append("file",file);
            console.log(formData);
            fetch(
                `http://diseasefighter.pythonanywhere.com/model/${modelname}`,
                {
                    method: "POST",
                    body: formData,
                    mode: "cors",
                    headers: {
                        Authorization: `Barer ${window.localStorage.getItem(
                            "token"
                        )}`,
                    },
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    if(data.prediction_result){
                        this.setState({prediction_result:data.prediction_result})
                    }
                    else{
                        this.setState({error:data.message})
                    }
                })
                .catch((err) => {
                    this.setState({error:"The server's Model is not working"})
                });
    }
    render(){
        const {active_res,prediction_result,error}=this.state
    return(
        <div>
            <Navbar />
            <div className='d-flex'>
                <Menu />
                <div className='main-container d-flex justify-content-center col-lg-10 col-md-10'>
                <div className='Model col-8 d-flex flex-column justify-content-center align-items-center'>
                {!active_res?(
                        <div className="drag-area" >
                        <br />
                        <label htmlFor='model' className='d-flex flex-column justify-content-center align-items-center'>
                        <div className="icon" htmlFor='model'><i class="fa fa-upload"></i></div>
                            Drop Your Files Here</label>
                        <input type="file" id='model' hidden onChange={this.uploadModel}/>
                    </div>
                    ):(<div>
                        <p className='btn active' onClick={()=>this.setState({active_res:false,error:''})}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left me-1" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                            </svg>
                            Go Back</p>
                        <div className='Circular-container'>
                        {prediction_result.length?(prediction_result.map((pred)=>(
                            <div className='test'>
                            <CircularProgressbarWithChildren value={pred.percentage}>
                            <p className='pred'>{pred.percentage}%</p>
                                <p>{pred.type}</p>
                            </CircularProgressbarWithChildren>
                        </div>
                        ))):(<div>
                            {error?(<p>{error} Please go back and try again</p>):(
                                <div>
                                    <p>Please Wait</p>
                                    <Spinner />
                                </div>
                            )}
                        </div>)}
                        
                        </div>
                    </div>)}
                </div>
                </div>
            </div>
        </div>
    )
    }
}
export default Model;