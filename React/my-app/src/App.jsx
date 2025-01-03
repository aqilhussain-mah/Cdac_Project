import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import Home from './Components/Home'
import NavigationBar from './Components/NavigationBar';
import Location from './Components/Location';
import AboutUs from './Components/AboutUs';
import MyBooking from './Components/MyBooking';
import Profile from './Components/Profile';
import Login from './Components/Login';
import Register from "./Components/Register"
import UserRegister from './Components/UserRegistration'
import ManagerRegister from './Components/ManagerRegister'


function App() {

  const location = useLocation();
  const spotlight = location.pathname.includes('ContactUs') ? "ContactUs" : "About";

  return (
    <div className='App'>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/Location' element={<Location />}></Route>
        <Route path='/About' element={<AboutUs spotlight={spotlight} />} ></Route>
        <Route path='/ContactUs' element={<AboutUs spotlight={spotlight} />} ></Route>
        <Route path='/MyBooking' element={<MyBooking />}></Route>
        <Route path='/Profile' element={<Profile />}></Route>
        <Route path='/Login/*' element={<Login />}></Route>
        <Route path='/UserRegister' element={<UserRegister />}></Route>
        <Route path='/ManagerRegister' element={<ManagerRegister />}></Route>
        <Route path="/Register" element={<Register />}></Route>
      </Routes>

    </div>
  )
}

export default App
