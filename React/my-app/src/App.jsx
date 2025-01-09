import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import Home from './Components/Home';
import NavigationBar from './Components/NavigationBar';
import Location from './Components/Location';
import AboutUs from './Components/AboutUs';
import MyBooking from './Components/MyBooking';
import Login from './Components/Login';
import Register from "./Components/Register";
import UserRegistration from './Components/UserRegistration';
import AdminRegistrationForm from './Components/AdminRegistrationForm';
import Booking from './Components/Booking';
import { AppProvider } from './Components/AppContext';  // Import the context provider
import AdminHome from './Components/AdminHome';
// import InquiryTable from './Components/InquiryTable';


function App() {

  const location = useLocation();
  const spotlight = location.pathname.includes('ContactUs') ? "ContactUs" : "About";

  return (
    <AppProvider>  {/* Wrap the entire app with AppProvider */}
      <div className='App'>
        <NavigationBar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/Location' element={<Location />}></Route>
          <Route path='/About' element={<AboutUs spotlight={spotlight} />} ></Route>
          <Route path='/ContactUs' element={<AboutUs spotlight={spotlight} />} ></Route>
          <Route path='/MyBooking' element={<MyBooking />}></Route>
          <Route path='/Login/*' element={<Login />}></Route>
          <Route path='/UserRegistration' element={<UserRegistration />}></Route>
          <Route path='/adminRegister' element={<AdminRegistrationForm />} ></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path='/adminhome' element={<AdminHome></AdminHome>}></Route>
          <Route path="/Booking" element={<Booking />}></Route>
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
