import React, { useState } from 'react'
import Button from '@mui/material/Button';

import { Login } from './features/Login'
import { Home } from './features/Home'
import { Header } from './components/Header';

function App() {
  const [user, setUser] = useState(null);
  console.log('111111111111111111111', user);
  return (
    <React.Fragment>
      <Header />
      {user ? <Home /> : <Login setUser={setUser} />}
      <Button onClick={() => setUser(null)}>Log Out</Button>
    </React.Fragment>
  )
}

export default App