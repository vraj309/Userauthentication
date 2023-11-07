import React from 'react'
import  { useEffect, useState } from 'react'
import axios from 'axios';
import { InputText } from 'primereact/inputtext';

function ViewUser(props) {
    const initialUserInfo = {
      id: props.userid,
      email: '',
      first_name: '',
      last_name: '',
      name: '',
      avatar: '',
    };
  
    const [userInfo, setUserInfo] = useState(initialUserInfo);
  
    useEffect(() => {
      fetchUserData();
    }, [props.userid]); 
  
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users/' + props.userid);
        if (response && response.data) {
          setUserInfo(response.data.data); 
        }
      } catch (e) {
        console.log(e);
      }
    };
  
    return (
      <div className="user-view">
        <center>
          <h1>View User Info</h1>
        </center>
        <div className="box">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <p>
                <div className="card flex justify-content-center">
                  <label htmlFor="email">Email</label>
                  <span className="p-float-label">
                    <InputText id="email" value={userInfo.email} readOnly />
                  </span>
                </div>
              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <div className="card flex justify-content-center">
                  <label htmlFor="first_name">First Name</label>
                  <span className="p-float-label">
                    <InputText id="first_name" value={userInfo.first_name} readOnly />
                  </span>
                </div>
              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <div className="card flex justify-content-center">
                  <label htmlFor="last_name">Last Name</label>
                  <span className="p-float-label">
                    <InputText id="last_name" value={userInfo.last_name} readOnly />
                  </span>
                </div>
              </p>
            </div>
            <div className="col-sm-12 col-md-6">
              <p>
                <div className="card flex justify-content-center">
                  <label htmlFor="avatar">Avatar</label>
                  <span className="p-float-label">
                    <InputText id="avatar" value={userInfo.avatar} readOnly />
                  </span>
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ViewUser;