

import './App.css';

import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';

import Project from './pages/Project';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Auth from './components/Auth';
import { useContext } from 'react';
import { isAuthTokenContext } from './components/contexts/ContextShare';

function App() {
  const{isAuthToken, setIsAuthToken} = useContext(isAuthTokenContext)

  return (
    <div >
       
      

      <Routes>
     
        <Route path='/' element={ <Home/>}></Route>
        <Route path='/login' element={<Auth/>}></Route>
        <Route path='/register' element={ <Auth  register/> }></Route>
        <Route path='/dashboard' element={ isAuthToken? <Dashboard dashboard/>: <Home/>}></Route>
        <Route path='/project' element={ <Project/>}></Route>

      </Routes>
      
       <Footer/>
      
      
    </div>
  );
}

export default App;
