import { useState } from "react";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import styled from 'styled-components'

function SignUpForm({ onLogin, chatEngineAuth, getLocation }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const chatAccountData = {
    "username": email,
    "secret": password,
    "first_name": name
  }

  // object sent to create User account on ChatEngine platform
  const configObj = {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      'PRIVATE-KEY': `{{${process.env.REACT_APP_CHAT_ENGINE_IO_KEY}}}`
    },
    body: JSON.stringify(chatAccountData)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([])
    setIsLoading(true);
    // create new user account for app
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user)
          getLocation(user.id)
          // create new user account for ChatEngine
          fetch('https://api.chatengine.io/users/', configObj)
          .then(r => {
            if (r.ok) {
              r.json().then(user => {
                chatEngineAuth(email, password)
                navigate('/profile')
              })
            } else {
              r.json().then((err) => setErrors(err.errors))
            }
          })
        })
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    })
  }

  return (
    <SignUpFormStyle>
    <form onSubmit={handleSubmit} className="signup-form">
        <TextField
        required
        label="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        fullWidth
      />
      <TextField
        required
        label="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        fullWidth
      />
      <TextField
        required
        type="password"
        label="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
      />
      {errors.map((err) => {
          return <Alert severity="error" key={err}>{err}</Alert>
      })}
      <div className="button-container">
        <Button type="submit" variant="contained">
          {isLoading ? "Loading..." : "Sign Up"}
        </Button>
      </div>
    </form>
    </SignUpFormStyle>
  );
}

export default SignUpForm;

const SignUpFormStyle = styled.div`

  form {
    margin: auto;
    width: 80%;
    margin-bottom: 1em;
  }

`