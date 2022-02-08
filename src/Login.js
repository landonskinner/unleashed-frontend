import { useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import axios from "axios";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import PetsIcon from '@mui/icons-material/Pets';
import styled from 'styled-components'


function Login({ onLogin, getLocation }) {

  const [showLogin, setShowLogin] = useState(true);

  const chatEngineAuth = async (email, password) => {
    
    const authObject = {
      'Project-ID': '{{bdccd118-daa8-45d2-b72f-297005ad398a}}',
      'User-Name': `{{${email}}}`,
      'User-Secret': `{{${password}}}`
    }

    // login request to ChatEngine
    try {
      await axios.get('https://api.chatengine.io/', {headers: authObject})
      sessionStorage.setItem('username', email);
      sessionStorage.setItem('password', password)
      // try to implement without password in storage

    } catch (error) {
        console.log('Incorrect credentials!')
    }
  }

  return (
    <LoginStyle>
      <div className="header-parent">
        <div className="app-header-login">unLeashed</div>
      </div>
      <div className="login">
        <Paper variant="outlined">
        {showLogin ? (
          <>
            <h1><PetsIcon sx={{fontSize: 40}}/> Login</h1>
            <LoginForm onLogin={onLogin} chatEngineAuth={chatEngineAuth} getLocation={getLocation} />
            <div>
              <Divider className="account-create">
                <Chip label="Don't have an account?" />
              </Divider>
              <Button variant="outlined" onClick={() => setShowLogin(false)}>
                Sign Up
              </Button>
            </div>
          </>
        ) : (
          <>
            <h1><PetsIcon sx={{fontSize: 40}}/> Sign Up</h1>
            <SignUpForm onLogin={onLogin} chatEngineAuth={chatEngineAuth} getLocation={getLocation} />
            <div>
              <Divider className="account-create">
                <Chip label="Already have an account?" />
              </Divider>
              <Button variant="outlined" onClick={() => setShowLogin(true)}>
                Login
              </Button>
            </div>
          </>
        )}
        </Paper>
      </div>
    </LoginStyle>
  );
}

export default Login;

const LoginStyle = styled.div`

  background-color: #E68282;
  height: 100vh;

  .login:nth-child(2) {
    margin: auto;
    width: 40%;
    position: relative;
    top: 3.5em;
  }

  h1 {
    color: #E68282;
    font-size: 2.5em;
    font-family: 'Fredoka One', cursive;
    letter-spacing: 0.05em;
    margin-top: 0.25em;
  }

  h1 svg {
    position: relative;
    top: 0.1em;
  }

  div {
    text-align: center;
  }

  hr {
    margin: 1em;
  }

  div button {
    margin: 1.5em;
  }

`