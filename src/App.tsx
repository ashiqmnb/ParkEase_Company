import './App.css'
import { Box } from '@mui/material'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Toaster } from "sonner";
import Login from './pages/auth/Login';
import ForgotPw from './pages/auth/ForgotPw';
import VerifyOtp from './pages/auth/VerifyOtp';
import ResetPw from './pages/auth/ResetPw';
import Layout from './components/Layout';
import Profile from './pages/Profile';
import Slots from './pages/Slots';
import Transactions from './pages/Transactions';



function AppContext(){
  return(
    <Box>
      <Toaster 
        position="top-right" 
        richColors
        duration={3000}
        // expand={true} 
      />

      <Routes>
        <Route path='/' element={<Layout/>} >
          <Route path='dashboard' element={<h1>Dashboard</h1>}/>
          <Route path='slots' element={<Slots/>}/>
          <Route path='transactions' element={<Transactions/>}/>
          <Route path='profile' element={<Profile />}/>
        </Route>


        <Route path='/auth'>
          <Route path='login' element={<Login />}/>
          <Route path="forgotpw" element={<ForgotPw />} />
          <Route path='verifyotp' element={<VerifyOtp />}/>
          <Route path="resetpw" element={<ResetPw />} />
        </Route>
      </Routes>
    </Box>
  )
}



function App() {
  return (
    <Router>
      <AppContext/>
    </Router>
  )
}

export default App
