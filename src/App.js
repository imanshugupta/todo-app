import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Main from './components/MainComponent';
import { configureStore } from './redux/store';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
