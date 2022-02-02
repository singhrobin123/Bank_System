import { Routes, Route } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Provider } from "react-redux";
import store from "./store";
import Header from "./components/Navbar/header";
import Customer from "./components/Dashboard/customer";
import Manager from "./components/Dashboard/manager";
import Login from "./components/Auth/login";
import Register from "./components/Auth/register";
import Spinner from './components/Model/spinner';


function App() {
  useEffect(() => {
    
  }, []);
  return (
    <Provider store={store}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Spinner /> }/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/dashboard/manager" element={<Manager/>}/>
          <Route exact path="/dashboard/customer" element={<Customer/>}/>
          <Route path="*" element={<h1> Wrong Route </h1>}/>
        </Routes>
    </Provider>
  );
}

export default App;
