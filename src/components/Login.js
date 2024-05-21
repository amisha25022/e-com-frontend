import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CardComponent from '../components/CardComponent/CardComponent';

const Auth = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/");
        }
    }, [navigate]);

    const validate = () => {
        const errors = {};
        if (!email) {
            errors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            errors.email = "Email is invalid.";
        }
        if (!password) {
            errors.password = "Password is required.";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters.";
        }
        if (!isLogin && !name) {
            errors.name = "Name is required.";
        }
        return errors;
    }

    const handleAction = async () => {
        const errors = validate();
        setErrors(errors);
        if (Object.keys(errors).length > 0) return;

        const endpoint = isLogin ? "login" : "register";
        const payload = isLogin ? { email, password } : { name, email, password };

        let result = await fetch(`http://localhost:5000/${endpoint}`, {
            method: 'post',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        if (result.auth) {
            isLogin ? localStorage.setItem('user', JSON.stringify(result?.user)) : localStorage.setItem('user', JSON.stringify(result?.result));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate("/");
        } else {
            alert("Please enter correct details");
        }
    }

    const switchAuthMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
    }

    return (
        <CardComponent
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleAction={handleAction}
            isLogin={isLogin}
            errors={errors}
            switchAuthMode={switchAuthMode}
        />
    );
}

export default Auth;
