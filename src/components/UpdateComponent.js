import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import InputBox from "./InputBox/InputBox"
import Button from "./Button/Button"
import AlertBox from "./AlertBox/AlertBox"

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompnay] = React.useState('');
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [severity, setSeverity] = useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        try {
            let result = await fetch(`http://localhost:5000/product/${params.id}`);
            result = await result.json();
            setName(result.name);
            setPrice(result.price);
            setCategory(result.category);
            setCompnay(result.company);
        } catch (error) {
            setAlert(true);
            setSeverity("error");
            setAlertMessage("Failed to fetch product details.");
            setTimeout(() => {
                setAlert(false);
            }, 4000);
        }
    };

    const updateProduct = async () => {
        try {
            let result = await fetch(`http://localhost:5000/product/${params.id}`, {
                method: 'PUT',
                body: JSON.stringify({ name, price, category, company }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            result = await result.json();
            if (result.error) {
                throw new Error(result.error);
            } else {
                setAlert(true);
                setSeverity("success");
                setAlertMessage("Product updated successfully!");
                setTimeout(() => {
                    setAlert(false);
                    navigate('/');
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
    };

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

    const updateProductStyle = {
        textAlign: "left",
        marginTop: "4%",
        fontSize: "25px",
        fontFamily: "Montserrat-Bold",
        fontWeight: "700",
        marginBottom: "2%"
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
                <div style={updateProductStyle}>
                    Update Product
                </div>
                <InputBox
                    id="product-name"
                    label='Product Name'
                    placeholder='Enter product name'
                    onClick={handleProductName}
                    initialValue={name}
                    customClass={customInputBoxStyle}
                />
                <InputBox
                    id="product-price"
                    label='Product Price'
                    placeholder='Enter product price'
                    onClick={handleProductPrice}
                    initialValue={price}
                    customClass={customInputBoxStyle}
                />
                <InputBox
                    id="product-category"
                    label='Product Category'
                    placeholder='Enter product category'
                    onClick={handleProductCategory}
                    initialValue={category}
                    customClass={customInputBoxStyle}
                />
                <InputBox
                    id="product-company"
                    label='Product Company'
                    placeholder='Enter product company'
                    onClick={handleProductCompany}
                    initialValue={company}
                    customClass={customInputBoxStyle}
                />
                <Button
                    label={"Update Product"}
                    buttonType="primary"
                    onClick={updateProduct}
                    customStyle={customButtonStyle}>

                </Button>
            </div>
        </>
    )
}

export default UpdateProduct;