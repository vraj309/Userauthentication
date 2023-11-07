 import axios from 'axios';
import React, { useState } from 'react';
import { Form, Field } from 'react-final-form'; 
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const initialUserInfo = {
    email: '',
    firstname: '',
    lastname: '',
    avatar: '',
};

const AddUser = (props) => {
    const [userInfo, setUserInfo] = useState(initialUserInfo);

    const addNewUser = async (values) => {
        try {
            if (!validateForm(values)) {
                return;
            }

            const response = await axios.post('https://reqres.in/api/users', values); // Use the values from the form

            if (response.status === 201) {
                toast.success('User added Successfully', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
                setUserInfo(initialUserInfo);
                props.setUserAdded();
            } else {
                toast.warn('User not Added', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                });
            }
        } catch (e) {
            toast.error('An error occurred while adding the user', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 2000,
            });
            console.error(e);
        }
    };

    const validateForm = (data) => {
        let errors = {};

        if (!data.email) {
            errors.email = 'Email is required.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }
        if (!data.firstname) {
            errors.firstname = 'FirstName is required.';
        }
        if (!data.lastname) {
            errors.lastname = 'LastName is required.';
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
            onSubmit={addNewUser}
            initialValues={userInfo}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div className="user-edit">
                        <center>
                            <h1>Basic info</h1>
                        </center>
                        <div className="box">
                            <div className="row">
                                    <div className='col-sm-15 col-md-6'>
                                        <p>
                                            <div className="card flex justify-content-center ">
                                                <Field name="email" validate={required}>
                                                    {({ input, meta }) => (
                                                        <div className="field">
                                                            <span className="p-float-label">
                                                                <InputText id="email" {...input} autoFocus className={meta.error && meta.touched ? 'p-invalid' : ''} />
                                                                <label htmlFor="email" className={meta.error && meta.touched ? 'p-error' : ''}>Email*</label>
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
                                                <Field name="firstname" validate={required}>
                                                    {({ input, meta }) => (
                                                        <div className="field">
                                                            <span className="p-float-label">
                                                                <InputText id="firstname" {...input} className={meta.error && meta.touched ? 'p-invalid' : ''} />
                                                                <label htmlFor="firstname" className={meta.error && meta.touched ? 'p-error' : ''}>FirstName*</label>
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
                                                <Field name="lastname" validate={required}>
                                                    {({ input, meta }) => (
                                                        <div className="field">
                                                            <span className="p-float-label">
                                                                <InputText id="lastname" {...input} className={meta.error && meta.touched ? 'p-invalid' : ''} />
                                                                <label htmlFor="lastname" className={meta.error && meta.touched ? 'p-error' : ''}>LastName*</label>
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
                                                                <InputText id="avatar" {...input} className={meta.error && meta.touched ? 'p-invalid' : ''} />
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
                            <div className="add-btn">
                                <Button className="btn btn-success" type="submit">
                                    Add New User
                                </Button>
                                <ToastContainer />
                            </div>
                        </div>
                    </div>
                </form>
            )}
            />
    );
}


export default AddUser;



