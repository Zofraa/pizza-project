import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

import './scss/app.scss';

export const someContext = React.createContext('');

export function App() {
  const [searchText, setSearchText] = React.useState('');

  return (
    <div className="wrapper">
      <someContext.Provider value={{ searchText, setSearchText }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </someContext.Provider>
    </div>
  );
}

export default App;
