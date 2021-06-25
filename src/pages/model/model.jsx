import React from 'react'
import './model.css'
import '../../componant/globalstyle.css'
import Navbar from '../../componant/navbar/navbar'
import Menu from '../../componant/menu/menu'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


class Model extends React.Component{
    constructor(){
        super()
        this.state={
            active_res:false
        }
    }
    uploadModel=(e)=>{
        this.setState({active_res:true})
    }
    render(){
        const {active_res}=this.state
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
                    ):(<div className='Circular-container'>
                        <div className='test'>
                            <CircularProgressbarWithChildren value={55}>
                            <p className='pred'>{55}%</p>
                                <p>First</p>
                            </CircularProgressbarWithChildren>
                        </div>
                        <div className='test'>
                            <CircularProgressbarWithChildren value={55}>
                            <p className='pred'>{55}%</p>
                                <p>First</p>
                            </CircularProgressbarWithChildren>
                        </div>
                        <div className='test'>
                            <CircularProgressbarWithChildren value={55}>
                            <p className='pred'>{55}%</p>
                                <p>viral pneumonia</p>
                            </CircularProgressbarWithChildren>
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