
import { Switch , Route ,useHistory } from 'react-router-dom'
import FirstScreen from './pages/first-screen/first-screen'
import Login from './pages/login/login'
import Signup from './pages/signup/signup'
import Home from './pages/home/home'
import Setting from './pages/setting/setting'
import Doctors from './pages/doctors/doctors'
import Appointments from './pages/appointments/appointments'
import Review from './pages/review/review'
import Meeting from './pages/metting/meeting'
import Model from './pages/model/model'
import PrivateRoute from './componant/PrivateRoute'
import Favourite from './pages/favourite/favourite'

function App() {
  const history =useHistory();
  const logout=()=>{
    window.localStorage.clear()
    history.push('/')
  }
  return (
    <div className="App">
      <Switch>
      <Route exact path='/' component={FirstScreen} />
      <Route exact path='/login' render={()=>(
             window.localStorage.getItem('token')?(
               history.goBack(),
               alert('You Already Login')
             ):(<Login />)
           )} />
      <Route exact path='/signup' render={()=>(
             window.localStorage.getItem('token')?(
               history.goBack(),
               alert('Logout First')
             ):(<Signup />)
           )} />
      <PrivateRoute exact path='/favourite' component={Favourite} />
      <PrivateRoute exact path='/home' component={Home} />
      <PrivateRoute exact path='/setting' component={Setting} />
      <PrivateRoute exact path='/appointments' component={Appointments} />
      <PrivateRoute  path='/doctors/:id' component={Doctors} />
      <PrivateRoute exact path='/review' component={Review} />
      <PrivateRoute exact path='/meeting' component={Meeting} />
      <PrivateRoute exact path='/model' component={Model} />
      <PrivateRoute exact path='/logout' component={logout} />
      </Switch>
    </div>
  );
}

export default App;
