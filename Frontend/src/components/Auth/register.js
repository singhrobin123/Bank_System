
import { authUser, setStore } from './auth.actions';
import axios from "axios";
import { getUser } from '../Navbar/verify.actions';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import InfoModel from '../Model/infomodal';
import ReactDOM from 'react-dom';
import './login.css';

function Register(props) {
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [type, setType] = useState("customer");
    const navigate = useNavigate();
    
    useEffect(() => {
        props.getUser(setDataHandler);
    }, []);
    const setDataHandler = (nameParam, flag, userType) => {
  
        if(flag) {
            setLoading(false);
            if(userType == 'customer') {
                navigate('/dashboard/customer');
            } else{
                navigate('/dashboard/manager');
            }
        } else {
            setLoading(false);
        }
    }
    const onChangeHandler = ({target}) => {
        
        let {name,value} = target;
        switch(name) {
            case "name":
                setName(value);
                break;
            case "email":
                setEmail(value);
                break;
            case "phone":
                setPhone(value);
                break;
            case "password":
                setPassword(value);
                break;
            case "type":
                setType(value.toLowerCase());
                break;
        }
    };

    const confirmHandler = (status, message, userType, err) => {
      let title = (status == 'success') ? "Success" : "Error";
      ReactDOM.render(
          <InfoModel title={title} message={message} status={status} />,
          document.getElementById("error-model")
      );
      if(status == "success") {
          if(userType == 'customer') {
              navigate('/dashboard/customer');
          } else{
              navigate('/dashboard/manager');
          }
      }
  }
    const submitHandler = (e) => {
        e.preventDefault();       
        let userData = {name: name, email: email, phone: phone, type: type, password: password};
        props.authUser(userData, confirmHandler);
    };

  return (
    <div className="App">
    {!loading && 
     <div className="login-form">    
        <form>
            <h4 className="modal-title">Create New Account</h4>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Name:</label>
                <input type="text" className="form-control" name = "name" onChange={onChangeHandler} placeholder="Username" required="required" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Email:</label>
                <input type="email" className="form-control" name = "email" onChange={onChangeHandler} placeholder="Email" required="required" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Phone:</label>
                <input type="email" className="form-control" name = "phone" onChange={onChangeHandler} placeholder="Phone" required="required" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlSelect1">User type:</label>
                <select className="form-control" name="type" onChange={onChangeHandler} id="exampleFormControlSelect1">
                <option>Customer</option>
                <option>Manager</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Password:</label>
                <input type="password" className="form-control" name = "password" onChange={onChangeHandler} placeholder="Password" required="required" />
            </div>
            <button type="button" onClick={submitHandler} className="btn btn-primary btn-block btn-lg" value="Login">Register</button>             
        </form>			
        <div className="text-center small">Alredy have an account? <a href="/login">Login</a></div>
      </div>
    }
    </div>
  );
}

const mapStateToProps = state => {
    return{user:state.auth.user,auth: state.auth}
  }
  const mapDispatchToProps = dispatch => {
    return {
      authUser:(userData, confirmHandler)=>dispatch(authUser(userData, confirmHandler)),
      setStore:() => dispatch(setStore()),
      getUser:(setDataHandler) => dispatch(getUser(setDataHandler))
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Register);
