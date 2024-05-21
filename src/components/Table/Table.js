import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import IconMenu from '../../assets/images/ActionIcon.svg';
import Pagination from '../Pagination/Pagination';
import interCheckbox from '../../assets/images/interCheckBox.svg';
import sortIcon from '../../assets/images/sort.svg';
import sortAsceIcon from '../../assets/images/sort-ascending.svg';
import sortDescIcon from '../../assets/images/sort-descending.svg';
import './Table.css';
export default function Table({
    data,
    columns,
    actions,
    handleActionClick,
    customStyle,
    rowClickFunction = null,
    customCellCss,
    rowClickValue = null,
    isChecKbox,
    handleSelectedRows,
    isPagination,
    itemsPerPage,
    rowsPerPageOptions,
    onPageChange,
    setRowLimit,
    showOptions,
    totalItems,
    customPaginationStyle,
    goToPage,
    handleSort,
    isAscending,
    sortBy
}) {
    const [hoveredDiv, setHoveredDiv] = useState(null);
    const [clickedDiv, setClickedDiv] = useState(null);
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [tableData, setTableData] = useState(data);
    const handleMouseEnter = index => {
        setHoveredDiv(index);
    };
    useEffect(() => {
        if (typeof handleSelectedRows == 'function') {
            handleSelectedRows(selectedRows);
        }
    }, [selectedRows]);
    useEffect(() => {
        setSelectedRows([]);
        setSelectAll(false);
        setTableData(data);
    }, [data]);
    const handleMouseLeave = () => {
        setHoveredDiv(null);
    };
    const handleClick = (index, row, event) => {
        setClickedDiv(index);
        if (rowClickFunction && typeof rowClickFunction == 'function' && row[rowClickValue]) {
            rowClickFunction(row[rowClickValue], event);
        }
    };
    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelected = tableData.map((item, index) => item);
            setSelectedRows(newSelected);
            setSelectAll(true);
            return;
        }
        setSelectedRows([]);
        setSelectAll(false);
    };
    const handleCheckBox = (event, item) => {
        if (event.target.checked) {
            setSelectedRows([...selectedRows, item]);
        }
        if (!event.target.checked) {
            let updatedSelection = selectedRows.filter(obj => !isEqual(obj, item));
            setSelectedRows(updatedSelection);
            setSelectAll(false);
        }
    };
    const handleReSelectAll = event => {
        const newSelected = tableData.map((item, index) => item);
        setSelectedRows(newSelected);
        setSelectAll(true);
    };
    function isEqual(obj1, obj2) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (const key of keys1) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
        return true;
    }
    return /*#__PURE__*/React.createElement("div", {
        className: "table-container"
    }, /*#__PURE__*/React.createElement("div", {
        className: "header",
        style: customStyle
    }, isChecKbox && /*#__PURE__*/React.createElement("div", {
        className: "checkbox-header"
    }, selectedRows.length < tableData.length && selectedRows.length != 0 ? /*#__PURE__*/React.createElement("img", {
        onClick: handleReSelectAll,
        style: {
            height: "1rem",
            width: "2rem",
            cursor: 'pointer'
        },
        src: interCheckbox,
        alt: "svg"
    }) : /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        style: {
            height: "1rem",
            width: "2rem"
        },
        checked: selectAll || tableData.length === selectedRows.length,
        onClick: handleSelectAllClick
    })), columns.map((column, index) => /*#__PURE__*/React.createElement("div", {
        key: index,
        style: customCellCss,
        className: index === 0 && !actions ? 'first-row-title' : 'title'
    }, column.label, column.isSorting ? sortBy === column.id ? isAscending ? /*#__PURE__*/React.createElement("div", {
        onClick: () => handleSort(column),
        className: "sorting"
    }, /*#__PURE__*/React.createElement("img", {
        src: sortAsceIcon
    })) : /*#__PURE__*/React.createElement("div", {
        onClick: () => handleSort(column),
        className: "sorting"
    }, /*#__PURE__*/React.createElement("img", {
        src: sortDescIcon
    })) : /*#__PURE__*/React.createElement("div", {
        onClick: () => handleSort(column),
        className: "sorting"
    }, /*#__PURE__*/React.createElement("img", {
        src: sortIcon
    })) : /*#__PURE__*/React.createElement(React.Fragment, null))), actions && /*#__PURE__*/React.createElement("div", {
        className: "action-head"
    }, "ACTION")), tableData?.length === 0 ? /*#__PURE__*/React.createElement("div", {
        className: "no-data-avilable-container"
    }, /*#__PURE__*/React.createElement("p", {
        className: "no-data-avilable-container-text"
    }, "No data available.")) : tableData?.map((row, rowIndex) => /*#__PURE__*/React.createElement("div", {
        style: customStyle,
        key: rowIndex,
        onMouseEnter: () => handleMouseEnter(rowIndex),
        onMouseLeave: handleMouseLeave,
        onClick: event => handleClick(rowIndex, row, event),
        className: clickedDiv === rowIndex && rowClickFunction ? 'clicked-row' : hoveredDiv === rowIndex ? 'content-row-hovered' : rowIndex === tableData.length - 1 && !isPagination ? 'content-row-last' : 'content-row'
    }, isChecKbox && /*#__PURE__*/React.createElement("div", {
        key: rowIndex,
        className: "checkbox-header"
    }, /*#__PURE__*/React.createElement("input", {
        type: "checkbox",
        style: {
            height: "1rem",
            width: "2rem"
        },
        checked: selectedRows.includes(tableData[rowIndex]) ? true : false,
        onClick: event => {
            handleCheckBox(event, tableData[rowIndex]);
        }
    })), columns.map((column, columnIndex) => /*#__PURE__*/React.createElement("div", {
        key: columnIndex,
        style: customCellCss,
        className: columnIndex === 0 && !actions ? 'first-element-content-style' : 'content-style'
    }, column.format ? column.format(row, rowIndex) : row[column.id])), actions && /*#__PURE__*/React.createElement("div", {
        className: "action-icon"
    }, ' ', /*#__PURE__*/React.createElement("img", {
        onClick: event => {
            actions.handleActionClick(row, event);
            event.stopPropagation();
        },
        style: {
            marginLeft: '25px',
            marginTop: '20px',
            height: '25px',
            cursor: 'pointer'
        },
        src: IconMenu,
        alt: "svg"
    })))), isPagination ? /*#__PURE__*/React.createElement("div", {
        className: "pagination-div",
        style: customPaginationStyle
    }, /*#__PURE__*/React.createElement(Pagination, {
        itemsPerPage: itemsPerPage,
        totalItems: totalItems,
        rowsPerPageOptions: rowsPerPageOptions,
        onPageChange: onPageChange,
        showOptions: showOptions,
        setRowLimit: setRowLimit,
        goToPage: goToPage
    })) : null);
}
Table.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    actions: PropTypes.object,
    customStyle: PropTypes.object,
    customPaginationStyle: PropTypes.object,
    customCellCss: PropTypes.object,
    handleSelectedRows: PropTypes.func,
    handleChangePage: PropTypes.func,
    isPagination: PropTypes.bool,
    showOptions: PropTypes.bool,
    rowsPerPageOptions: PropTypes.array,
    totalItems: PropTypes.number,
    itemsPerPage: PropTypes.number,
    isChecKbox: PropTypes.bool,
    goToPage: PropTypes.number,
    sortBy: PropTypes.string,
    handleSort: PropTypes.func,
    isAscending: PropTypes.bool
};