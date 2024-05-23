import {React, useState} from 'react';
import AlertBox from './AlertBox/AlertBox'
import InputBox from './InputBox/InputBox';
import Button from './Button/Button';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompnay] = useState('');
    const [error,setError] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [severity, setSeverity] = useState("");
    const navigate= useNavigate();

    const addProduct = async () => {
        if (!name || !price || !company || !category) {
            setError(true);
            return false;
        } else {
            try {
                const userId = JSON.parse(localStorage.getItem('user'))._id;
                let result = await fetch("http://localhost:5000/add-product", {
                    method: "post",
                    body: JSON.stringify({ name, price, category, company, userId }),
                    headers: {
                        "Content-type": "application/json"
                    }
                });
                result = await result.json();
                if (result.error) {
                    throw new Error(result.error);
                } else {
                    setAlert(true);
                    setSeverity("success");
                    setAlertMessage("Product added successfully!");
                    setTimeout(() => {
                        setAlert(false);
                        navigate("/");
                    }, 4000);
                }
            } catch (error) {
                setAlert(true);
                setSeverity("error");
                setAlertMessage(error.message);
                setTimeout(() => {
                    setAlert(false);
                }, 4000);
            }
        }
    }

    const handleProductName = (event) => {
        setName(event.value)
    };
    const handleProductPrice = (event) => {
        setPrice(event.value)
    };
    const handleProductCategory = (event) => {
        setCategory(event.value)
    };
    const handleProductCompany = (event) => {
        setCompnay(event.value)
    };

    const handleAlertClose = () => {
        setAlert(false);
        setSeverity("");
        setAlertMessage("");
    };

    const customInputBoxStyle = {
        width: "33.4375rem",
        height: "40px",
        maxWidth: "none",
        marginBottom: "40px"
    };
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
    const addProductStyle={
        textAlign: "left", 
        marginTop: "4%", 
        fontSize: "25px", 
        fontFamily: "Montserrat-Bold", 
        fontWeight: "700", 
        marginBottom: "2%"
    }

    return (
        <>
            {alert ? (
                <AlertBox
                    severity={severity}
                    message={alertMessage}
                    handleClose={handleAlertClose}
                />
            ) : null}
            <div className='product'>
                <div style={addProductStyle}>
                    Add Product
                </div>
                <InputBox
                    id="product-name"
                    label='Product Name'
                    placeholder='Enter product name'
                    error={error ? true : false}
                    helperText={error ? "Enter valid name" : ""}
                    customhelperTextStyle={{ fontSize: "15px" }}
                    onClick={handleProductName}
                    customClass={customInputBoxStyle}
                />
                <InputBox
                    id="product-price"
                    label='Product Price'
                    placeholder='Enter product price'
                    error={error ? true : false}
                    helperText={error ? "Enter product price" : ""}
                    customhelperTextStyle={{ fontSize: "15px" }}
                    onClick={handleProductPrice}
                    customClass={customInputBoxStyle}
                />
                <InputBox
                    id="product-category"
                    label='Product Category'
                    placeholder='Enter product category'
                    error={error ? true : false}
                    helperText={error ? "Enter product category" : ""}
                    customhelperTextStyle={{ fontSize: "15px" }}
                    onClick={handleProductCategory}
                    customClass={customInputBoxStyle}
                />
                <InputBox
                    id="product-company"
                    label='Product Company'
                    placeholder='Enter product company'
                    error={error ? true : false}
                    helperText={error ? "Enter product company" : ""}
                    customhelperTextStyle={{ fontSize: "15px" }}
                    onClick={handleProductCompany}
                    customClass={customInputBoxStyle}
                />
                <Button
                    label={"Add Product"}
                    buttonType="primary"
                    onClick={addProduct}
                    customStyle={customButtonStyle}>

                </Button>
            </div>
        </>
    )
}

export default AddProduct;