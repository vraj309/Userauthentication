import React from 'react'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { useState } from 'react';
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Form, Field } from 'react-final-form';
import './style.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const handleLogin = (values) => {
    if (validate(values)) {
      axios.post("https://reqres.in/api/login", {
        username: values.name,
        password: values.password,
      })
        .then(res => {
          localStorage.setItem("token", res.data.token);
          toast.success("Login Successful", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          })
          navigate('/User');
        })
        .catch((err) => {
          toast.warn('Login Failed. Please correct the Username & Password.', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          })
        });
    }
  }

  function required(value) {
    return value ? undefined : 'Required';
  }

  const validate = (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = 'UserName is required.';
    }
    if (!values.password) {
      errors.password = 'Password is required.';
    }
    return errors;
  };

  return (
    <Form
      onSubmit={handleLogin}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          <Field name="name" validate={required}>
            {({ input, meta }) => (
              <div className="field">
                <span className="p-float-label">
                  <InputText id="name" {...input} autoFocus className={meta.error && meta.touched ? 'p-invalid' : ''} />
                  <label htmlFor="name" className={meta.error && meta.touched ? 'p-error' : ''}>UserName*</label>
                </span>
                {meta.error && meta.touched && <small className="p-error">{meta.error}</small>}
              </div>
            )}
          </Field>

          <Field name="password" validate={required}>
            {({ input, meta }) => (
              <div className="field">
                <span className="p-float-label">
                  <InputText id="password" type="password" {...input} className={meta.error && meta.touched ? 'p-invalid' : ''} />
                  <label htmlFor="password" className={meta.error && meta.touched ? 'p-error' : ''}>Password*</label>
                </span>
                {meta.error && meta.touched && <small className="p-error">{meta.error}</small>}
              </div>
            )}
          </Field>

          <Button label="Login" icon="pi pi-user" className="w-10rem mx-auto" type="submit" />
        </form>
      )}
    />
  );
}

export default Login;
