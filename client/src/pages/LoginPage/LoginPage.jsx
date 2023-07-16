import React from 'react'
import "./LoginPage.css"

const LoginPage = () => {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        console.log(formProps)
    }

    return (
        <form className='login' onSubmit={onSubmit}>
            <div className="form__group field">
                <input type="input" className="form__field" autoComplete="off" placeholder="Username" name="username" id='username' required />
                <label htmlFor="username" className="form__label">Username</label>
            </div><div className="form__group field">
                <input type="input" autoComplete="off" className="form__field" placeholder="Password" name="password" id='password' required />
                <label htmlFor="password" className="form__label">Password</label>
            </div>
            <button>Login</button>
        </form>
    )
}

export default LoginPage