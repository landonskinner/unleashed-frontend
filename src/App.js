import { useEffect, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';

import Matches from './Matches';
import Login from './Login';
import SwipeContainer from './SwipeContainer';
import ProfileForm from './ProfileForm';
import ProfilePage from './ProfilePage';
import NavBar from './NavBar';
import './App.css';

function App() {

  const [user, setUser] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setUser(user)
          getLocation(user.id)
        })
      }
    })
  }, [])

  const handleLogoutClick = () => {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        sessionStorage.clear()
        setUser(null);
        navigate('/')
      }
    });
  }

  const getLocation = (userId) => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetch(`/profiles/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lat: position.coords.latitude,
            lng: position.coords.longitude
        })
      })
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
      })
    }, () => null)
  }

  if (!user) return <Login onLogin={setUser} getLocation={getLocation} />;

  if (user.profile === null) return (
    <div className="signup-background">
      <ProfileForm user={user} setUser={setUser} getLocation={getLocation}/>
    </div>
  )

  return (
    <div className="App">
      <header className="app-header">unLeashed</header>
      <div className="navbar">
        <NavBar handleLogoutClick={handleLogoutClick}/>
      </div>
      <Routes>
        <Route 
          path="/"
          element={<SwipeContainer user={user} />}
        />
        <Route 
          path="/home"
          element={<SwipeContainer user={user} />}
        />
        <Route 
          path="/matches"
          element={<Matches user={user} />}
        />
        <Route 
          path="/profile"
          element={<ProfilePage user={user} setUser={setUser}/>}
        />
      </Routes>
    </div>
  );
}

export default App;
