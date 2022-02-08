import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import styled from 'styled-components'

function LoginForm({ onLogin, chatEngineAuth, getLocation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit= (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          onLogin(user)
          getLocation(user.id)
          chatEngineAuth(email, password)
          navigate('/profile')
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <LoginFormStyle>
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        required
        label="Name"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        required
        label="Email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
      />
      <TextField
        fullWidth
        required
        type="password"
        label="Password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
      />
      {errors.map((err) => {
          return <Alert severity="error" key={err}>{err}</Alert>
      })}
      <div className="button-container">
        <Button type="submit" variant="contained">
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </div>
    </form>
    </LoginFormStyle>
  );
}

export default LoginForm;

const LoginFormStyle = styled.div`

  form {
  margin: auto;
  width: 80%;
  margin-bottom: 1em;
  }


`