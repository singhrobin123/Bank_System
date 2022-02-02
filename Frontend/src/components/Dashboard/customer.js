
import { changeUserData } from './dashboard.actions';
import { getUser } from '../Navbar/verify.actions';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Model/spinner';
import ReactDOM from 'react-dom';
import InfoModel from '../Model/infomodal';

function Customer(props) {
    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState(false);
    const [user, setUser] = useState(null);
    const [id, setID] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");
    const [interest, setInterest] = useState("");
    const [netAmount, setNetAmount] = useState("");
    const [money, setMoney] = useState("");
    const [handle, setHandle] = useState("");
    const [err, setError] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
      

    });
    useEffect(() => {
      props.getUser(setDataHandler);
    }, []);

    useEffect(() => {
       if(!!user) {
         setID(user.id);
         setName(user.name);
         setEmail(user.email);
         setPhone(user.phone);
         setName(user.name);
         setAmount(user.amount);
         setInterest(user.interest);
         setNetAmount(parseInt(user.amount) + parseInt(user.interest));
       }   
    }, [user]);

    const setUsersHandler = (userData, err = null) => {
        if(userData == null && err != null) {
          let title = "Error";
          let message = "Something went wrong";
          let status = "failed";
            ReactDOM.render(
              <InfoModel title={title} message={message} status={status} />,
              document.getElementById("error-model")
          );
        } else {
          setUser(userData);
          let title = "Success";
          let message = (handle == "Credit") ? "Successfully Credit Money" : "Successfully Debit Money";
          let status = "Success";
            ReactDOM.render(
              <InfoModel title={title} message={message} status={status} />,
              document.getElementById("error-model")
          );
        }
    }
    const setDataHandler = (nameParam, flag, userType, userData) => {
        if(flag) {
            setLogin(true);
            setLoading(false);
            setUser(userData);
            if(userType == 'customer') {
                navigate('/dashboard/customer');
            } 
        } else {
            setLoading(true);
            navigate('/login');
        }
    }

    const creditHandler = ({target}) => {
      setMoney(0);
      setHandle("Credit");
      window.$("#myModal1").modal("show");
    }
    const debitHandler = ({target}) => {
      setHandle("Debit");
      setMoney(0);
      window.$("#myModal1").modal("show");
    }
    const onChangeHandlerCustomer = ({target}) => {
        let {name,value} = target;
        switch(name) {
            case "money":
                if(parseInt(netAmount) < parseInt(value) && handle == "Debit"){
                  setError("Amount limit Exceed. You don't have this money!");
                } else if(parseInt(value) < 0){
                  setError("Negative amount not allow!");
                } else {
                  setError("");
                }
                setMoney(value);                
                break;
        }
    }
    const submitHandlerCustomer = (e) => {
        e.preventDefault();
        let {target} = e;
        if(parseInt(netAmount) < parseInt(money) && handle == "Debit"){
          setError("Amount limit Exceed. You don't have this money!");
        } else if(parseInt(money) < 0){
          setError("Negative amount not allow!");
        } else {
          setError("");
          let userData = {amount: money};
          if(handle == "Debit") {
            props.changeUserData(id, {amount: parseInt(amount) - parseInt(money)}, setUsersHandler);
          } else {
            props.changeUserData(id, {amount: parseInt(money) + parseInt(amount) }, setUsersHandler);
          }
          setMoney(0);
          window.$("#myModal1").modal("hide");
          return;
        }
    };
    return (
      <>
      {loading && <Spinner /> }
      {!loading && 
        <>
        <table className="table">
          <thead className="thead-dark">
          <tr>
              <th scope="col">Name:</th>
              <th scope="col">Email:</th>
              <th scope="col">Phone:</th>
              <th scope="col">Amount</th>
              <th scope="col">Interest</th>
              <th scope="col">Total Amount</th>
              <th scope="col"></th>
              <th scope="col"></th>
          </tr>
          </thead>
          <tbody>
          <tr>
              <th scope="row">{name}</th>
              <td>{email}</td>
              <td>{phone}</td>
              <td>{amount}</td>
              <td>{interest}</td>
              <td>{(parseInt(amount) + parseInt(interest))}</td>
              <td><button type="button" onClick={debitHandler}  id={id} className="btn btn-danger">Debit</button></td>
              <td><button type="button" onClick={creditHandler}  id={id} className="btn btn-success">Credit</button></td>
          </tr>
          </tbody>
        </table>
      <div id="myModal1" className="modal fade" role="dialog">
            <div className="modal-dialog modal-md">
                {/* Modal content*/}
                <div className="modal-content">
                    <div className="modal-header bg-info">
                        <h4 className="modal-title text-white">{handle} Amount:</h4>
                        <button type="button" className="close text-white" data-dismiss="modal">
                            ×
                        </button>
                    </div>
                    <form action="#" method="POST">
                        <div className="modal-body">
                            <h3 style={{textAlign: 'center'}}>Current Balance: {netAmount}</h3>  
                            <div className="row">
                                <div className="col-md-12">
                                    <label  className="font-weight-bold">
                                        Amount:
                                    </label>
                                    <div className="form-group">
                                        <input type="number" name="money" value={money} onChange={onChangeHandlerCustomer} className="form-control" placeholder="" required="required" />
                                    </div>
                                    <label  className="font-weight-normal">
                                       {err}
                                    </label>
                                </div>
                            </div>
                            <div className="form-group text-right">
                                <button type="button" onClick={submitHandlerCustomer} name="Customer" className="btn btn-success font-weight-bold p-1 px-3">
                                    {handle}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
        }
      </>
    );
  }
  
  const mapStateToProps = state => {
    return{user: state.auth.user}
  }
  const mapDispatchToProps = dispatch => {
    return {
        changeUserData:(id, userData, setUsersHandler) => dispatch(changeUserData(id, userData, setUsersHandler)),
        getUser:(setDataHandler) => dispatch(getUser(setDataHandler))
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Customer);
  