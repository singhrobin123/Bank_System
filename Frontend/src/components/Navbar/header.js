import { getUser, logoutUser } from './verify.actions';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import './header.css';
import InfoModel from '../Model/infomodal';
import ReactDOM from 'react-dom';

const Header = (props) => {
    const [name, setName] = useState("");
    const [login, setLogin] = useState(false);
    const [loading, setLoading] = useState(0);
    const navigate = useNavigate();
    useEffect(()=>{
        props.getUser(setDataHandler); 
    },[]);

    const setDataHandler = (nameParam, flag, userType) => {
        if(flag) {
            setName(nameParam);
            setLogin(true);
            setLoading(1);
            if(userType == 'customer') {
                navigate('/dashboard/customer');
            } else {
                navigate('/dashboard/manager');
            }
        } else {
            setLoading(2);
            if(window.location.pathname == '/register')
                navigate('/register');
            else
                navigate('/login');
        }
    }
    const confirmHandler = (status) => {
       if(status == 'success') setLogin(false);
       let title = (status == 'success') ? "Success" : "Error";
       let message = (status == 'success') ? "Successfully logout" : "Something went wrong";
        ReactDOM.render(
            <InfoModel title={title} message={message} status={status} />,
            document.getElementById("error-model")
        );
        if(status == "success") {
                navigate('/login');
        } else{
                navigate('/dashboard/customer');
        }
    }
    const logoutHandler = (e) => {
        e.preventDefault();
        props.logoutUser(confirmHandler);
    }
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Banking System</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {loading != 0 && 
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                    {login && <li className="nav-item active">
                        <a className="nav-link" href="/dashboard/customer">Dashboard <span className="sr-only">(current)</span></a>
                    </li>
                    }
                
                    {login ?
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {name}
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                            <a className="dropdown-item" onClick={logoutHandler}>Logout</a>
                            </div>
                        </li>
                        :
                        <>
                        <li className="nav-item">
                            <a className="nav-link" href="/register">Register</a>
                        </li> 
                        <li className="nav-item">
                            <a className="nav-link" href="/login">Login</a>
                        </li> 
                        </>
                    }
                    </ul>
                </div>
            }   
        </nav>
    );
};

const mapStateToProps = state => {
    return{user:state.auth.user,auth: state.auth}
  }
  const mapDispatchToProps = dispatch => {
    return {
      getUser:(setDataHandler) => dispatch(getUser(setDataHandler)),
      logoutUser:(confirmHandler) => dispatch(logoutUser(confirmHandler)),
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Header);