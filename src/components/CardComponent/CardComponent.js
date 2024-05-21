import React from 'react';
import { Card, Space, Input, Button } from 'antd';
import InputBox from "../../components/InputBox/InputBox";

import './CardComponent.css';

const CardComponent = ({ name, setName, email, setEmail, password, setPassword, handleAction, isLogin, errors, switchAuthMode }) => {

    const handleName = (event) => {
        setName(event.value) 
    };
    const handleEmail = (event) => {
        setEmail(event.value)
    };
    const handlePassword = (event) => {
        setPassword(event.value)
    };
    return (
        <div className="card-container">
            <div className="card-image">
                <img src="https://static.vecteezy.com/system/resources/previews/006/388/780/original/the-cart-is-placed-on-the-mobile-phone-shopping-bags-inside-online-shopping-concept-illustration-decorated-with-credit-card-boxes-branches-on-a-pink-background-design-for-website-promotion-vector.jpg" alt="Side Image" style={{ borderRadius: "0.8rem 0rem 0rem 0.8rem" }} />
            </div>
            <div className="card-form">
                <Space direction="vertical" style={{ width: '100%' }}>
                    <img
                        alt='logo'
                        className='logo'
                        src='https://icons4web.com/wp-content/uploads/2019/11/Shopping-cart-icon-for-website-8211-Shopping-cart-stock-image-299562.jpg'
                        style={{ height: "5%", width: "20%", margin: "-10% 0% 2% 40%" }}
                    />
                    <Card style={{ width: '100%' }}>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <h2>{"Login to your Account"}</h2>
                        </div>
                        {!isLogin && (
                            <>
                                <InputBox
                                    id= "name"
                                    placeholder="Name"
                                    onClick={handleName}
                                    customClass={{
                                        width: "33.4375rem",
                                        height: "56px",
                                        maxWidth: "none",
                                        marginBottom: "25px"
                                    }}
                                />
                                {errors.name && <span className="error">{errors.name}</span>}
                            </>
                        )}
                        <InputBox
                            id="email"
                            label="Email"
                            onClick={handleEmail}
                            customClass={{
                                width: "33.4375rem",
                                height: "56px",
                                maxWidth: "none",
                                marginBottom: "25px"
                            }}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                        <InputBox
                            id="password"
                            label="Password"
                            onClick={handlePassword}
                            customClass={{
                                width: "33.4375rem",
                                height: "56px",
                                maxWidth: "none",
                                marginBottom: "25px"
                            }}
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                        <Button onClick={handleAction} type="primary" block>
                            {isLogin ? "Login" : "Signup"}
                        </Button>
                        <div style={{ textAlign: 'center', marginTop: '20px' }}>
                            {isLogin ? (
                                <p>Don't have an account? <a onClick={switchAuthMode}>Sign Up</a></p>
                            ) : (
                                <p>Already have an account? <a onClick={switchAuthMode}>Login</a></p>
                            )}
                        </div>
                    </Card>
                </Space>
            </div>
        </div>
    );
}

export default CardComponent;
