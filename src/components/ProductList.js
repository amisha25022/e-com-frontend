import React, { useEffect, useState } from 'react';
import Table from './Table/Table';
import InputBox from './InputBox/InputBox';
import AlertBox from "./AlertBox/AlertBox"
import { useNavigate } from 'react-router-dom';
import Button from './Button/Button';
import TrashIcon from "../assets/images/trash.svg";
import EditIcon from "../assets/images/editIcon.svg";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [severity, setSeverity] = useState("");
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const username = user ? user.name : "Amisha";

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            let result = await fetch('http://localhost:5000/products', {
                headers: {
                    authorization: JSON.parse(localStorage.getItem('token'))
                }
            });
            result = await result.json();
            setProducts(result);
        } catch (error) {
            setAlert(true);
            setSeverity("error");
            setAlertMessage("Failed to fetch products.");
            setTimeout(() => {
                setAlert(false);
            }, 4000);
        }
    }

    const deleteProduct = async (id) => {
        try {
            let result = await fetch(`http://localhost:5000/product/${id}`, {
                method: "DELETE"
            });
            result = await result.json();
            if (result) {
                setAlert(true);
                setSeverity("success");
                setAlertMessage("Product deleted successfully!");
                setTimeout(() => {
                    setAlert(false);
                }, 4000);
                getProducts();
            }
        } catch (error) {
            setAlert(true);
            setSeverity("error");
            setAlertMessage("Failed to delete product.");
            setTimeout(() => {
                setAlert(false);
            }, 4000);
        }
    }

    const searchHandle = async (e) => {
        let key = e.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }
    }

    const productsData = products.map((item, index) => ({
        "S.NO.": index + 1,
        "Product Name": item?.name,
        "Price": item?.price,
        "Category": item?.category,
        "Company": item?.company,
        "Action": (
            <div>
                <img
                    src={EditIcon}
                    alt="Edit"
                    onClick={() => navigate(`/update/${item._id}`)}
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
    }));

    const customTableClass = {
        display: "grid",
        gridTemplateColumns: "16% 16% 16% 16% 16% 20%",
        height: 'max-content'
    };

    const customCellCss = {
        width: "fit-content"
    };

    const headingStyle = {
        borderRadius: "8px",
        textAlign: "center",
        margin: "0",
        fontSize: "24px",
        fontWeight: "bold"
    };

    const handleAlertClose = () => {
        setAlert(false);
        setSeverity("");
        setAlertMessage("");
    };

    return (
        <>
            {alert && (
                <AlertBox
                    severity={severity}
                    message={alertMessage}
                    handleClose={handleAlertClose}
                />
            )}
            <div className="product-list">
                <div style={headingStyle}>
                    <h3>Product List</h3>
                </div>
                <div className="product-list-heading">
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
                    <Button
                        buttonType="secondary"
                        customStyle={{
                            width: "136px",
                            height: "42px",
                            backgroundColor: "#475BD8",
                            fontFamily: "Montserrat-Regular",
                            fontSize: "15px",
                            fontStyle: "normal",
                            fontWeight: 700,
                            lineHeight: "normal",
                            borderRadius: "21px",
                            color: "#FFF",
                            whiteSpace: "nowrap",
                        }}
                        onClick={() => navigate('/add')}
                        label={"Add Product"}
                    />
                </div>
                <Table
                    columns={[
                        { id: "S.NO.", label: "S.NO." },
                        { id: "Product Name", label: "Product Name" },
                        { id: "Price", label: "Price" },
                        { id: "Category", label: "Category" },
                        { id: "Company", label: "Company" },
                        { id: "Action", label: "Action" },
                    ]}
                    data={productsData}
                    customCellCss={customCellCss}
                    columnStyles={customTableClass}
                />
            </div>
        </>
    );
}

export default ProductList;