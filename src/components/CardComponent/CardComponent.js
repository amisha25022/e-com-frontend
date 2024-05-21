import React from 'react';
import { Card, Space, Input } from 'antd';
import InputBox from "../../components/InputBox/InputBox";
import Button from "../../components/Button/Button";

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
    console.log(errors, "#3333");
    const customButtonStyle = {
        height: '48px',
        padding: '10px 24px',
        width: '40%',
        gap: '16px',
        color: '#FFF',
        fontFamily: 'Montserrat-Regular',
        fontSize: '16px',
        borderRadius: '25px',
        background: 'linear-gradient(180deg, #134CDE 0%, #163FB7 100%)',
    };
    return (
        <div className="card-container">
            <div className="card-image">
                <img src="https://static.vecteezy.com/system/resources/previews/006/388/780/original/the-cart-is-placed-on-the-mobile-phone-shopping-bags-inside-online-shopping-concept-illustration-decorated-with-credit-card-boxes-branches-on-a-pink-background-design-for-website-promotion-vector.jpg" alt="Side Image" style={{ borderRadius: "0.8rem 0rem 0rem 0.8rem" }} />
            </div>
            <div className="card-form">
                <Space direction="vertical" style={{ width: '100%' }}>
                    {/* <img
                        alt='logo'
                        className='logo'
                        src='https://icons4web.com/wp-content/uploads/2019/11/Shopping-cart-icon-for-website-8211-Shopping-cart-stock-image-299562.jpg'
                        style={{ height: "5%", width: "20%", margin: "-10% 0% 2% 40%" }}
                    /> */}
                    <Card style={{ width: '100%' }}>
                        <div style={{ textAlign: 'left', marginBottom: '20px', fontFamily: "Montserrat- Regular", fontSize: "15px" }}>
                            <h2>{"Login to your Account"}</h2>
                        </div>
                        {!isLogin && (
                            <>
                                <InputBox
                                    id= "name"
                                    placeholder="Name"
                                    onClick={handleName}
                                    error={errors?.name ? true : false}
                                    helperText={errors ? errors?.name : ""}
                                    customClass={{
                                        width: "33.4375rem",
                                        height: "40px",
                                        maxWidth: "none",
                                        marginBottom: "25px"
                                    }}
                                />
                            </>
                        )}
            
                        <InputBox
                            id="email"
                            label="Email"
                            onClick={handleEmail}
                            error={errors?.email ? true : false}
                            helperText={errors? errors?.email:""}
                            customClass={{
                                width: "33.4375rem",
                                height: "40px",
                                maxWidth: "none",
                                marginBottom: "25px"
                            }}
                        />
                        <InputBox
                            id="password"
                            label="Password"
                            onClick={handlePassword}
                            error={errors?.password ? true : false}
                            helperText={errors ?  errors?.password: ""}
                            customClass={{
                                width: "33.4375rem",
                                height: "40px",
                                maxWidth: "none",
                                marginBottom: "25px"
                            }}
                        />
                        <Button
                            label={isLogin ? "Login" : "Signup"}
                            buttonType="primary"
                            onClick={handleAction}
                            customStyle={customButtonStyle}>
                           
                        </Button>
                        <div style={{ textAlign: 'left', marginTop: '20px', fontFamily: "Montserrat-Regular", fontSize:"20px" }}>
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
