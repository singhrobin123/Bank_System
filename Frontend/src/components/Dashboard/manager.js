
import { removeUser, updateUser, AddUser } from './dashboard.actions';
import { getUser } from '../Navbar/verify.actions';
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Updatecomponent from './updatecomponent';
import Spinner from '../Model/spinner';
// import './manager.css';

function Manager(props) {
    const [loading, setLoading] = useState(true);
    const [login, setLogin] = useState(false);
    const [users, setUsers] = useState([]);
    const [id, setID] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState(0);
    const [interest, setInterest] = useState(0);
    const [netAmount, setNetAmount] = useState(0);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // for new user
    const [addOperation, setAddOperation] = useState(0);

    useEffect(() => {
        if(!!props.user && props.user.length != 0) {
            setLoading(false);
            setUsers(props.user);
        }
    });
    useEffect(() => {
        props.getUser(setDataHandler);
    }, []);

    const setUsersHandler = (val) => {
        if(!!val) {
            setEmail("");
            setName("");
            setPhone("");
            setAmount("");
            setPassword("");
            return setUsers(val);
        }
    }
    const setDataHandler = (nameParam, flag, userType) => {
        if(flag) {
            setLogin(true);
            setLoading(false);
            if(userType == 'customer') {
                navigate('/dashboard/customer');
            }
        } else {
            setLoading(true);
            navigate('/login');
        }
    }
    const deleteHandler = (e) => {
        setAddOperation(0);
        e.preventDefault();
        let {target} = e;
        let {id} = target;
        let data = props.removeUser(id, setUsersHandler);
    };
    const updateHandler = ({target}) => {
        setAddOperation(0);
        let {id} = target;
        users.map(data => {
            if(data.id == id) {
                setID(data.id);
                setName(data.name);
                setEmail(data.email);
                setPhone(data.phone);
                setAmount(data.amount);
                setInterest(data.interest);
                setNetAmount((parseInt(data.amount) + parseInt(data.interest)));
            }
        });
        window.$("#myModal1").modal("show");
    };
    const onChangeHandlerCustomer = ({target}) => {
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
            case "amount":
                setAmount(value);
                setNetAmount(parseInt(value) + parseInt(interest));
                break;
            case "interest":
                setInterest(value);
                setNetAmount(parseInt(amount) + parseInt(value));
                break;
            case "password":
                setPassword(value);
                break;
        }
    }
    const submitHandlerCustomer = (e) => {
        e.preventDefault();
        let {target} = e;
        let userData = {name: name, email: email, phone: phone, amount: amount, interest: interest};
        props.updateUser(id, userData, setUsersHandler);
        window.$("#myModal1").modal("hide");
    };
    const addNewUserHandler = () => {
        setAmount(0);
        setAddOperation(1);
        window.$("#myModal1").modal("show");
    }
    const submitHandlerAddCustomer = (e) => {
        e.preventDefault();
        let {target} = e;
        let userData = {name: name, password: password, type: 'customer',  email: email, phone: phone, amount: parseInt(amount)};
        props.AddUser(userData, setUsersHandler);
        window.$("#myModal1").modal("hide");
    }
    return (
    <div>
        {loading && <Spinner />}
        {!loading &&
        <>
        <div style={{margin: "10px auto", textAlign: "center"}}>
            <button type="button" onClick={addNewUserHandler} className="btn btn-success">Add New User</button>
        </div>
        <table className="table">
            <thead className="thead-dark">
            <tr>
                <th scope="col">Name:</th>
                <th scope="col">Email:</th>
                <th scope="col">Phone:</th>
                <th scope="col">Amount</th>
                <th scope="col">Interest</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Delete</th>
                <th scope="col">Update</th>
            </tr>
            </thead>
            <tbody>
            {users && users.map((data, key) => 
            (data.type == 'customer') ?
            <tr key={key}>
                <th scope="row">{data.name}</th>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.amount}</td>
                <td>{data.interest}</td>
                <td>{(parseInt(data.amount) + parseInt(data.interest))}</td>
                <td><button type="button" onClick={deleteHandler} id={data.id} className="btn btn-danger">Delete</button></td>
                <td><button type="button" onClick={updateHandler} id={data.id} className="btn btn-success">Update</button></td>
            </tr>
            : null
            )
            }
            </tbody>
        </table>
        </>
    }
     <div id="myModal1" className="modal fade" role="dialog">
            <div className="modal-dialog modal-md">
                {/* Modal content*/}
                <div className="modal-content">
                    <div className="modal-header bg-info">
                        <h4 className="modal-title text-white">{addOperation == 0 ? "Update" : "Add"}  Customer</h4>
                        <button type="button" className="close text-white" data-dismiss="modal">
                            ×
                        </button>
                    </div>
                    <form action="#" method="POST">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <label  className="font-weight-bold">
                                        Name:
                                    </label>
                                    <div className="form-group">
                                        <input type="text" name="name" value={name} onChange={onChangeHandlerCustomer} className="form-control" placeholder="Enter the Name.." required="required"  />
                                    </div>
                                    <label  className="font-weight-bold">
                                        Phone:
                                    </label>
                                    <div className="form-group">
                                        <input type="text" name="phone" value={phone} onChange={onChangeHandlerCustomer} className="form-control" placeholder="Enter the Phone.." required="required" />
                                    </div>
                                    <label  className="font-weight-bold">
                                        Amount:
                                    </label>
                                    <div className="form-group">
                                        <input type="number" name="amount" value={amount} onChange={onChangeHandlerCustomer} className="form-control" placeholder="" required="required" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    {addOperation == 0 ? <>
                                    <label className="font-weight-bold">
                                        Email:
                                    </label>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={email}
                                            placeholder="Enter the Email.."
                                            required="required"
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                            title="Please Enter Currect Email.."
                                            readonly
                                        />
                                    </div>
                                    </> : 
                                    <>
                                    <label className="font-weight-bold">
                                        New Email:
                                    </label>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={email}
                                            onChange={onChangeHandlerCustomer}
                                            placeholder="Enter the Email.."
                                            required="required"
                                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                            title="Please Enter Currect Email.."
                                        />
                                    </div>
                                    </>}

                                    {addOperation == 1 && <>
                                    <label className="font-weight-bold">
                                        Password:
                                    </label>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password" value={password} onChange={onChangeHandlerCustomer} placeholder="" required="required" />
                                    </div>
                                    </>
                                    }
                                    
                                    {addOperation == 0 && <>
                                    <label className="font-weight-bold">
                                        Interest:
                                    </label>
                                    <div className="form-group">
                                        <input type="number" className="form-control" name="interest" value={interest} onChange={onChangeHandlerCustomer} placeholder="" required="required" />
                                    </div>
                            
                                    <label className="font-weight-bold">
                                        Net Balance:
                                    </label>
                                    <div className="form-group">
                                        <input type="number" name="netAmount" value={netAmount} onChange={onChangeHandlerCustomer} className="form-control" placeholder="" required="required" readonly />
                                    </div>
                                    </>
                                    }
                                </div>
                            </div>
                            {
                                addOperation == 0 ? <div className="form-group text-right">
                                <button type="button" onClick={submitHandlerCustomer} name="Customer" className="btn btn-success font-weight-bold p-1 px-3">
                                    Update
                                </button>
                            </div>
                            : 
                            <div className="form-group text-right">
                                <button type="button" onClick={submitHandlerAddCustomer} name="Customer" className="btn btn-success font-weight-bold p-1 px-3">
                                    Add New User
                                </button>
                            </div>
                            }
                            
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  const mapStateToProps = state => {
    return{user: state.auth.users, auth: state.auth}
  }
  const mapDispatchToProps = dispatch => {
    return {
        removeUser:(id, setUsersHandler) => dispatch(removeUser(id, setUsersHandler)),
        updateUser:(id, userData, setUsersHandler) => dispatch(updateUser(id, userData, setUsersHandler)),
        AddUser:(userData, setUsersHandler) => dispatch(AddUser(userData, setUsersHandler)),
        getUser:(setDataHandler) => dispatch(getUser(setDataHandler))
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Manager);
  