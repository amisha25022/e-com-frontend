import React, { useEffect, useState } from 'react';
import Table from './Table/Table';
import InputBox from './InputBox/InputBox';
import TrashIcon from "../assets/images/trash.svg";
import EditIcon from "../assets/images/editIcon.svg"
const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:JSON.parse(localStorage.getItem('token'))
            }
        });
        result = await result.json();
        setProducts(result);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (e)=>{
        let key = e.value;
        if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json()
            if(result){
                setProducts(result)
            }
        }else{
            getProducts();
        }
        
    }
    const productsData = products.map((item, index) => ({
        "S.NO.": index + 1,
        "Product Name": item?.name,
        "Price": item?.price,
        "Category": item?.category,
        "Action": (
            <div>
                <img
                    src={EditIcon}
                    alt="Edit"
                    onClick={() => window.location.href = `/update/${item._id}`}
                    style={{ cursor: "pointer", marginRight: "30px" }}
                />
                <img
                    src={TrashIcon}
                    alt="Delete"
                    onClick={() => deleteProduct(item._id)}
                    style={{ cursor: "pointer" }}
                />
            </div>
        )
    }))

    const customTableClass = {
        display: "grid",
        gridTemplateColumns: "20% 20% 20% 20% 20%   ",
        height: 'max-content'
    };
    const customCellCss = {
        width: "fit-content"
    }
    const headingStyle = {
        borderRadius: "8px",
        textAlign: "center",
        margin: "20px 0",
        fontSize: "24px",
        fontWeight: "bold"
    };

    return (
        <div className="product-list">
            <div style={headingStyle}>
                <h3>Product List</h3>
            </div>
            <InputBox 
                id="search-product"
                placeholder='Search Product'
                onClick={searchHandle}
                isSearch={true}
                customClass={{
                    width: "376px",
                    maxWidth: "none",
                    height: "40px",
                    borderRadius: "8px",
                    marginLeft: "2%"
                    
                }}
                customInputClass={{ maxWidth: "none", width: "300px" }}
             />
            <Table
                columns={[
                    { id: "S.NO.", label: "S.NO." },
                    { id: "Product Name", label: "Product Name" },
                    { id: "Price", label: "Price" },
                    { id: "Category", label: "Category" },
                    { id: "Action", label: "Action" },
                ]}
                data={productsData}
                customCellCss={customCellCss}
                columnStyles={
                    customTableClass
                }
            />
        </div>
    )
}

export default ProductList;