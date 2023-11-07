import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form'; 
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditUser = (props) => {
    const initialUserInfo = {
        id: props.userid,
        email: '',
        first_name: '',
        last_name: '',
        avatar: '',
    };
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    useEffect(() => {
        setUserInfo({ ...userInfo, id: props.userid });
        fetchUserData();
    }, [props.userid]);

    const fetchUserData = async () => {
        try {
            const response = await axios.get('https://reqres.in/api/users/' + props.userid);

            if (response.status === 200) {
                setUserInfo(response.data.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const editUser = async () => {
        try {
            if (validateForm(userInfo)) {
                const response = await axios.put('https://reqres.in/api/users/' + props.userid, userInfo);

                if (response.status === 200) {
                    toast.success('User Edited Successfully', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 2000,
                    });
                    props.setShowEditMode();
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    const validateForm = (data) => {
        let errors = {};

        if (!data.email) {
            errors.email = 'Email is required.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }
        if (!data.first_name) {
            errors.first_name = 'First Name is required.';
        }
        if (!data.last_name) {
            errors.last_name = 'Last Name is required.';
        }
        if (!data.avatar) {
            errors.avatar = 'Avatar is required';
        }
        return errors;
    };

    function required(value) {
        return value ? undefined : 'Required';
    }

    return (
        <Form
            onSubmit={editUser}
            initialValues={userInfo}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                <div className='user-edit'>
             <center>
                 <h1>Edit User info</h1>
             </center>
             <div className='box center-vertically justify-content-center'>
                 <div className='row'>
                     <div className="card flex justify-content-center ">
                        <Field name="email" validate={required}>
                            {({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label">
                                        <InputText id="email"  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} {...input} autoFocus className={meta.error && meta.touched ? 'p-invalid' : ''} />
                                           <label htmlFor="email" className={meta.error && meta.touched ? 'p-error' : ''}>Email*</label>
                                    </span>
                                   {meta.error && meta.touched && <small className="p-error">{meta.error}</small>}
                                 </div>
                              )}
                         </Field>
                        </div>
                     <div className='col-sm-12 col-md-6'>
                    <p>
                  <div className="card flex justify-content-center ">
                    <Field name="first_name" validate={required}>
                        {({ input, meta }) => (
                        <div className="field">
                        <span className="p-float-label">
                        <InputText id="first_name" onChange={(e) => setUserInfo({ ...userInfo, first_name: e.target.value })} {...input} className={meta.error && meta.touched ? 'p-invalid' : ''} />
                     <label htmlFor="first_name" className={meta.error && meta.touched ? 'p-error' : ''}>FirstName*</label>
                     </span>
                    {meta.error && meta.touched && <small className="p-error">{meta.error}</small>}
                    </div>
                    )}
                    </Field>
                     </div>
                    </p>
                </div>
                <div className='col-sm-12 col-md-6'>
                 <p>
                    <div className="card flex justify-content-center ">
                    <Field name="last_name" validate={required}>
                    {({ input, meta }) => (
                    <div className="field">
                    <span className="p-float-label">
                     <InputText id="last_name"onChange={(e) => setUserInfo({ ...userInfo, lastname: e.target.value })} {...input} className={meta.error && meta.touched ? 'p-invalid' : ''} />
                     <label htmlFor="last_name" className={meta.error && meta.touched ? 'p-error' : ''}>LastName*</label>
                    </span>
                     {meta.error && meta.touched && <small className="p-error">{meta.error}</small>}
                     </div>
                     )}
                    </Field>
                     </div>
                     </p>
                    </div>
                    <div className='col-sm-12 col-md-6'>
                 <p>
                 <div className="card flex justify-content-center ">
                  <Field name="avatar" validate={required}>
                  {({ input, meta }) => (
                    <div className="field">
                    <span className="p-float-label">
                 <InputText id="avatar"onChange={(e) => setUserInfo({ ...userInfo, avatar: e.target.value })} {...input} className={meta.error && meta.touched ? 'p-invalid' : ''} />
               <label htmlFor="avatar" className={meta.error && meta.touched ? 'p-error' : ''}>Avatar*</label>
                 </span>
               {meta.error && meta.touched && <small className="p-error">{meta.error}</small>}
                </div>
              )}
              </Field>
             </div>
              </p>
              </div>
           </div>
             </div>
             <Button className='btn btn-success' onClick={() => editUser()}>
                 Edit User
             </Button>
             <ToastContainer />
        <div>
        </div>
            </div>
                </form>
            )}
        />
    );
}

export default EditUser;
