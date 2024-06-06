import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import { useState, useEffect } from 'react';
import Libary from './Libary';

function App() {
  const [session, setSession] = useState(() => JSON.parse(localStorage.getItem('session')) || false);
  const [usr, setUsr] = useState(() => localStorage.getItem('usr') || '');
  const [idUsr, setIdUsr] = useState(() => localStorage.getItem('idUsr') || null);

  useEffect(() => {
    localStorage.setItem('session', JSON.stringify(session));
    localStorage.setItem('usr', usr);
    localStorage.setItem('idUsr', idUsr);
  }, [session, usr, idUsr]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login session={session} setSession={setSession} setIdUsr={setIdUsr} setUsr={setUsr} />} />
          <Route path='/register' element={<Register />} />
          <Route path='/home' element={<Home session={session} setSession={setSession} usr={usr} idUsr={idUsr} />} />
          <Route path='/my-library' element={<Libary session={session} setSession={setSession} usr={usr} idUsr={idUsr}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
