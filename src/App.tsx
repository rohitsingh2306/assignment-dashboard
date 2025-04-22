// src/App.tsx
import React from 'react';
import Dashboard from './components/Dashboard';
import { Provider } from 'react-redux'
import { store } from '../src/redux/store'


const App: React.FC = () => {
  return(
  <Provider store={store}>
   <Dashboard />;
  </Provider>
  )
};

export default App;
