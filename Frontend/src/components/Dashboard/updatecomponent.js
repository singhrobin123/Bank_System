import { removeUser, updateUser } from './dashboard.actions';
import axios from "axios";
import {connect} from 'react-redux';
import React, { useState, useEffect } from 'react';

const Updatecomponent = () => {
    return(
        <div className="row justify-content-center">
            <div className="col-lg-4 mt-5 card-1">
                <a href="#" className="btn rounded hover:opacity-75 " data-toggle="modal" data-target="#myModal1">
                    <div className="card shadow-lg card-1">
                        <div className="card-body bg-info card-1">
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
}
const mapStateToProps = state => {
    return{user: state.auth.user,auth: state.auth}
  }
  const mapDispatchToProps = dispatch => {
    return {
        removeUser:(userData) => dispatch(removeUser(userData)),
        updateUser:(userData) => dispatch(updateUser(userData))
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Updatecomponent);