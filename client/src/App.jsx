import { Route, Routes } from 'react-router';

import Footer from './components/footer/Footer.jsx';
import Header from './components/header/Header.jsx';
import Home from './components/home/Home.jsx';
import Catalog from './components/catalog/Catalog.jsx';
import Details from './components/details/Details.jsx';
import GameCreate from './components/game-create/GameCreate.jsx';
import Register from './components/register/Register.jsx';
import Login from './components/login/Login.jsx';
import { useState } from 'react';

function App() {
  const [registerdUsers, setRegisterdUsers] = useState([]);
  const [user, setUser] = useState(null);

  const registerHandler = (email, password) => {
    if (registerdUsers.some((user) => user.email === email)) {
      throw new Error('Username is taken!');
    }

    const newUser = { email, password };
    setRegisterdUsers((state) => [...state, newUser]);
    // setUser(newUser);

    setUser(newUser);
  };

  const loginHandler = (email, password) => {
    const user = registerdUsers.find((u) => u.email === email && u.password === password);
    if (!user) {
      throw new Error('Invalid user!');
    }

    setUser(user);
  };

  return (
    <>
      <Header user={user} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Catalog />} />
        <Route path="/games/:gameId/details" element={<Details />} />
        <Route path="/games/create" element={<GameCreate />} />
        <Route path="/login" element={<Login onLogin={loginHandler} />} />
        <Route path="/register" element={<Register onRegister={registerHandler} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
