import React from 'react'
import "./LoginPage.css"
import axios from 'axios';
import { toast } from 'react-toastify';
import { saveTokenToStorage, saveUserToStorage } from '../../service/auth/authHelper';

const LoginPage = () => {

    const sendLoginRequest = async (values) => {

        await axios.post("http://localhost:8080/login", values)
            .then(res => {
                toast.success("Login successful");
                console.log("Login successful");
                const { accessToken, user } = res.data;
                saveTokenToStorage(accessToken);
                saveUserToStorage(user);
            })
            .catch(e => {
                const errors = e?.response?.data?.errors;
                const errorMessage = errors?.map((err) => err.message).join(', ');
                toast.error(`Login failed! ${errorMessage || ""}`);
                console.log("Login failed", errorMessage || "");
            });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        console.log(formProps);

        await sendLoginRequest(formProps);
    }


    return (
        <form className='login' onSubmit={onSubmit}>
            <h2>Login</h2>
            <div className="form__group field">
                <input type="input" className="form__field" autoComplete="off" placeholder="Username" name="username" id='username' required />
                <label htmlFor="username" className="form__label">Username</label>
            </div>
            <div className="form__group field">
                <input type="password" autoComplete="off" className="form__field" placeholder="Password" name="password" id='password' required />
                <label htmlFor="password" className="form__label">Password</label>
            </div>
            <button>Login</button>
        </form>
    )
}

export default LoginPage