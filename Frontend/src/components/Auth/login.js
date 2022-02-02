
import { setStore, loginUser } from './auth.actions';
import { getUser } from '../Navbar/verify.actions';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './login.css';
import InfoModel from '../Model/infomodal';

function Login(props) {
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
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
        let userData = {email: email, password: password};
        props.loginUser(userData, confirmHandler);
    };

  return (
    <div className="App">
    {!loading && 
     <div className="login-form">    
        <form>
            <h4 className="modal-title">Login to Your Account</h4>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Email:</label>
                <input type="email" className="form-control" name = "email" onChange={onChangeHandler} placeholder="Email" required="required" />
            </div>
            <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Password:</label>
                <input type="password" className="form-control" name = "password" onChange={onChangeHandler} placeholder="Password" required="required" />
            </div>
            <button type="button" onClick={submitHandler} className="btn btn-primary btn-block btn-lg" value="Login">Login</button>             
        </form>			
        <div className="text-center small">Don't have an account? <a href="/register">Sign up</a></div>
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
      loginUser:(userData, confirmHandler)=>dispatch(loginUser(userData, confirmHandler)),
      setStore:() => dispatch(setStore()),
      getUser:(setDataHandler) => dispatch(getUser(setDataHandler))
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Login);
