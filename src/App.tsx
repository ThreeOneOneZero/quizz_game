import React from 'react';
import './App.css';
// import Login from './Components/Pages/Login';
import { SnackbarProvider } from 'notistack';

const App = () => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={3000}
    >
      <div className="App">{/* <Login /> */}</div>
    </SnackbarProvider>
  );
};

export default App;
