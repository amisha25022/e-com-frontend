import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import InputBox from "./InputBox/InputBox"
import Button from "./Button/Button"

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompnay] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getProductDetails();
    }, [])

    const getProductDetails = async () => {
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompnay(result.company)
    }

    const updateProduct = async () => {
        console.warn(name, price, category, company)
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'Application/json'
            }
        });
        result = await result.json();
        if (result) {
            navigate('/')
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
        <div className='product'>
            <div style={updateProductStyle}>
                Update Product
            </div>
            <InputBox
                id="product-name"
                label='Product Name'
                placeholder='Enter product name'
                onClick={handleProductName}
                initialValue= {name} 
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
    )
}

export default UpdateProduct;