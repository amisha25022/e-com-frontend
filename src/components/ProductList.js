import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from './Table/Table';
import InputBox from './InputBox/InputBox';
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

    const searchHandle = async (event)=>{
        let key = event.value;
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

    return (
        <div className="product-list">
            <h3>Product List</h3>
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
                }}
                customInputClass={{ maxWidth: "none", width: "300px" }}
             />
            <Table
                columns={[
                    { id: "S.NO.", label: "S.NO." },
                    { id: "Name", label: "Product Name" },
                    { id: "Price", label: "Price" },
                    { id: "Category", label: "Category" },
                    { id: "Action", label: "Action" },
                ]}
                // data={collectionAgencyData}
                columnStyles={{
                    color: "#1C1C1C",
                    fontFamily: "Montserrat-Regular",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: 500,
                    lineHeight: "normal",
                }}
            />
          
            {
                products.length>0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/"+item._id} >Update </Link>
                            </li>

                    </ul>
                )
                :<h1>No Result Found</h1>
            }
        </div>
    )
}

export default ProductList;