import React from 'react';
import { AlertBox } from "./AlertBox";
import InputBox from './InputBox/InputBox';
import Button from './Button/Button';

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompnay] = React.useState('');
    const [error,setError] = React.useState(false);

    const addProduct = async () => {

        if(!name || !price || !company || !category)
        {
            setError(true);
            return false
        }else{
            const userId = JSON.parse(localStorage.getItem('user'))._id;
            let result = await fetch("http://localhost:5000/add-product", {
                method: "post",
                body: JSON.stringify({ name, price, category, company, userId }),
                headers: {
                    "Content-type": "application/json"
                }
            });
            result = await result.json();
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
            <h1>Add Product</h1>
            <InputBox
                id="product-name"
                label='Product Name'
                placeholder='Enter product name'
                error={error ? true : false}
                helperText={error ? "Enter valid name" : ""}
                customhelperTextStyle={{fontSize: "15px"}}
                onClick={handleProductName}
                customClass={customInputBoxStyle}
            />
            <InputBox
                id="product-price"
                label='Product Price'
                placeholder='Enter product price'
                error={error? true : false}
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
    )
}

export default AddProduct;