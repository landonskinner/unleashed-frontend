import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChatEngineWrapper } from 'react-chat-engine';
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#E68282',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

ReactDOM.render(
  
    <React.StrictMode>
      <ChatEngineWrapper>
        <ThemeProvider theme={theme} >
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </ChatEngineWrapper>
    </React.StrictMode>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
