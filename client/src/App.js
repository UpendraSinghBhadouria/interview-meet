import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './pages/ProtectedRoute';
import Video from './pages/Video';
import OurTeam from './pages/OurTeam';
import Rules from './pages/Rules';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/our-team' element={<OurTeam />} />
        <Route path='/rules' element={<Rules />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='/video/:roomId' element={
          <ProtectedRoute>
            <Video />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
