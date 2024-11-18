import React from 'react';
import './App.css';
import { Routes } from './Routes';

const App = () => {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) {
    return <p>Carregando...</p>;
  }

  return <Routes />;
};

export default App;
