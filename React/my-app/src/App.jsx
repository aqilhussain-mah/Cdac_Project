import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
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
import { AppProvider, AppContext } from './Components/AppContext';  // Import the context provider and context
import AdminHome from './Components/AdminHome';
import { useContext } from 'react';

function AppContent() {
  const location = useLocation();
  const { role } = useContext(AppContext);  // Access role from context

  const spotlight = location.pathname.includes('ContactUs') ? "ContactUs" : "About";

  return (
    <div className='App'>
      {role !== 'admin' && <NavigationBar />} 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Location' element={<Location />} />
        <Route path='/About' element={<AboutUs spotlight={spotlight} />} />
        <Route path='/ContactUs' element={<AboutUs spotlight={spotlight} />} />
        <Route path='/MyBooking' element={<MyBooking />} />
        <Route path='/Login/*' element={<Login />} />
        <Route path='/Registration' element={<UserRegistration />} />
        <Route path='/adminRegister' element={<AdminRegistrationForm />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/adminhome' element={<AdminHome />} />
        <Route path='/Booking' element={<Booking />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AppProvider>  
      <AppContent />
    </AppProvider>
  );
}

export default App;