import React from 'react'
import "./RegisterPage.css"

const RegisterPage = () => {

    const sendRegisterRequest = async (values) => {
        try {
            const response = await fetch("http://localhost:8080/register", {
                method: "POST",
                body: JSON.stringify(values),
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                console.log("Registration successful");
            } else {
                console.log("Registration failed");
            }
        } catch (error) {
            console.error("An error occurred during registration:", error);
        }
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