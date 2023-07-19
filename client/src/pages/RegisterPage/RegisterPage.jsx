import React from 'react'
import "./RegisterPage.css"
import { toast } from 'react-toastify';
import axios from 'axios';

const RegisterPage = () => {

    const sendRegisterRequest = async (values) => {

        await axios.post("http://localhost:8080/register", values)
            .then(data => {
                toast.success("Registration successful");
                console.log("Registration successful");
            })
            .catch(e => {
                const errors = e?.response?.data?.errors;
                const errorMessage = errors?.map((err) => err.message).join(', ');
                toast.error(`Registration failed! ${errorMessage || ""}`);
                console.log("Registration failed", errorMessage || "");
            });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        console.log(formProps);

        await sendRegisterRequest(formProps);
    }

    return (
        <form className='register' onSubmit={onSubmit}>
            <h2>Register</h2>
            <div className="form__group field">
                <input type="input" className="form__field" autoComplete="off" placeholder="Username" name="username" id='username' required />
                <label htmlFor="username" className="form__label">Username</label>
            </div>
            <div className="form__group field">
                <input type="email" className="form__field" autoComplete="off" placeholder="Email" name="email" id='email' required />
                <label htmlFor="email" className="form__label">Email</label>
            </div>
            <div className="form__group field">
                <input type="password" autoComplete="off" className="form__field" placeholder="Password" name="password" id='password' required />
                <label htmlFor="password" className="form__label">Password</label>
            </div>
            <button>Register</button>
        </form>
    )
}

export default RegisterPage