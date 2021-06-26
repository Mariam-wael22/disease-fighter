import React from 'react'
import { Link ,withRouter} from 'react-router-dom'
import './login.css'
import Logo from '../../image/logo.png'
import f from '../../image/f.png'
import t from '../../image/t.png'
import g from '../../image/g.png'
import '../../componant/globalstyle.css'

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            error:''
        }
    }
    Submit =(event)=>{ 
        event.preventDefault();
        const {email, password}=this.state;
        const data={'email':email,'password':password};
        console.log(data);
        fetch("https://thediseasefighter.herokuapp.com/login", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json",
          },
      })
          .then((res) => res.json())
          .then((data) => {
              console.log(data);
              if(data.is_doctor===true){
                window.localStorage.setItem('doctor',true)
              }
              if(data.access_token){
                window.localStorage.setItem('token',data.access_token)
                this.props.history.push('/home')
              }
              else{
                this.setState({error:data.message})
              }
              })
          .catch((err) => {console.log(err)});
       }
    handleChange = event => {
        const { value, name } = event.target;
    
        this.setState({ [name]: value });
      };
    render(){
        const {email,password,error}=this.state;
        return(
            <div className='login signin'>
                <div className='background-login'>
                </div>
                <div className='login-container'>
                    <div className='logo'>
                        <Link to='/'>
                        <img src={Logo} alt="" />
                        </Link>
                    </div>
                    <div className='login-content shadow rounded'>
                        <h2>Welcome Back!</h2>
                    <form onSubmit={this.Submit}>
                    <div class="mb-3">
                        <label>Email address</label>
                        <input type="email" name='email' class="form-control shadow p-2 rounded" value={email} onChange={this.handleChange} required/>
                    </div>
                    <div class="mb-3">
                        <label>Password</label>
                        <input type="password" name='password' class="form-control shadow p-2 rounded" value={password} onChange={this.handleChange} required/>
                    </div>
                    <div class="mb-1">
                        <button class='btn active shadow p-2 w-100 rounded'>Sign In</button>
                    </div>
                    <div>
                    <p class="text-danger">{error}</p>
                    </div>
                    </form>
                    <div className='d-flex justify-content-center w-100'>
                        <label>or login with</label>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <div className='alt-login shadow'>
                            <img src={g} alt='google'/>
                        </div>
                        <div className='alt-login shadow'>
                            <img src={f} alt='facebook'/>
                        </div>
                        <div className='alt-login shadow'>
                            <img src={t} alt='twitter'/>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center'>
                    <label>Don't have an account?</label>
                    <Link to='/signup' className='signup-link'>SIGN UP</Link>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Login);