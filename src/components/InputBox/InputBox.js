import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './InputBox.css';
import upArrow from '../../assets/images/upArrow.svg';
import check from '../../assets/images/check.svg';
import downArrow from '../../assets/images/downArrow.svg';
import EyeIcon from '../../assets/images/eye.svg';
import EyeSlashIcon from '../../assets/images/eye-slash.svg';
import SearchIcon from '../../assets/images/search-icon-default.svg';
import CustomIcon from "../../assets/images/successIcon.svg";

export default function InputBox({
    id,
    label = 'Name',
    onClick,
    customClass,
    customInputClass,
    customDropdownClass,
    type,
    initialValue,
    isDisabled = false,
    isPassword = false,
    isDrawdown = false,
    isSearch = false,
    options = [],
    accordianResp = false,
    error,
    helperText,
    isRequired,
    handleCallback = () => true,
    customErrorStyle,
    placeholder,
    regex,
    onDrawdownSelect,
    drawdownNextLine = false,
    Buttonlabel,
    isBoxType,
    customButtonStyle,
    onPaste = () => true,
    customhelperTextStyle,
    isReadOnly = false,
    filterOption = true,
    onKeyPress,
}) {
    const [inputType, setInputType] = useState(
        isPassword ? 'password' : type ? type : 'text',
    );
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);
    const [arrowType, setArrowType] = useState(true);
    const [inputValue, setInputValue] = useState(initialValue || '');
    const [selectedOption, setSelectedOption] = useState(initialValue || '');
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
    const [selectedOptionElement, setSelectedOptionElement] = useState(null);
    const [dropdownHeight, setDropdownHeight] = useState('54.9px');
    const newRef = useRef(null);
    const filteredOptions =
        type == 'number'
            ? [
                ...options.filter((option) => option.label.includes(inputValue)),
                ...options.filter((option) => !option.label.includes(inputValue)),
            ]
            : label.toLowerCase() === 'company' || label.toLowerCase() === 'partner'
                ? [
                    ...options.filter((option) =>
                        option.label.toLowerCase().includes(inputValue.toLowerCase()),
                    ),
                ]
                : filterOption
                    ? [
                        ...options.filter((option) =>
                            option.label.toLowerCase().includes(inputValue.toLowerCase()),
                        ),
                        ...options.filter(
                            (option) =>
                                !option.label.toLowerCase().includes(inputValue.toLowerCase()),
                        ),
                    ]
                    : [...options];

    const handleArrowKeyNavigation = (e) => {
        if (arrowType) {
            return;
        }
        if (filteredOptions.length === 0) return;

        switch (e.key) {
            case 'ArrowUp':
                e.preventDefault();
                moveSelection(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                moveSelection(1);
                break;
            case 'Enter':
                e.preventDefault();
                e.stopPropagation();
                if (selectedOptionIndex >= 0) {
                    handleDropdownSelection(
                        filteredOptions[selectedOptionIndex].label,
                        filteredOptions[selectedOptionIndex],
                    );
                }
                break;
            default:
                break;
        }
    };

    const moveSelection = (step) => {
        let newIndex = selectedOptionIndex + step;
        newIndex = Math.max(0, Math.min(newIndex, filteredOptions.length - 1));
        if (newIndex >= 0 && newIndex < filteredOptions.length) {
            // Calculate the height of each option div
            const optionHeight = 52.77; // Adjust as needed
            const container = newRef.current;

            // Calculate the offset to scroll the selected option into view
            const offset = newIndex * optionHeight;

            // Scroll the container to the calculated offset
            container.scrollTop = offset;

            setSelectedOptionIndex(newIndex);
        }
    };

    useEffect(() => {
        // Add event listener for arrow key navigation when the component mounts
        if (isDrawdown === true) {
            document.addEventListener('keydown', handleArrowKeyNavigation);
            let height = `${filteredOptions.length * 52.77 < 200
                    ? filteredOptions.length * 52.77
                    : 200
                }px`; // Adjust the 52.77 as needed
            if (height === '0px') height = '54.9px';
            setDropdownHeight(height);
            return () => {
                // Remove the event listener when the component unmounts
                document.removeEventListener('keydown', handleArrowKeyNavigation);
            };
        } else {
            document.addEventListener('keydown', (e) => {
                const arrowKeys = ['ArrowUp', 'ArrowDown'];
                if (arrowKeys.includes(e.key)) {
                    e.preventDefault();
                }
            });
        }
    }, [filteredOptions, selectedOption]);

    useEffect(() => {
        if (initialValue && String(initialValue).length > 0) {
            setInputValue(initialValue);
            setSelectedOption(initialValue);
            setHasValue(true);
        } else {
            setInputValue('');
        }
    }, [initialValue]);

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    });

    const handleOutsideClick = (e) => {
        if (newRef.current && !newRef.current.contains(e.target)) {
            setIsFocused(!isFocused);
            setArrowType(!arrowType);
        } else {
            // setIsVisible(false);
        }
    };

    const handleInputChange = (event) => {
        event.data = event.data ? event.data : event.target;
        if (regex) {
            if (regex.test(event.target.value)) {
                setInputValue(event.target.value);
            }
        } else {
            setInputValue(event.target.value);
        }
        if (isDrawdown) {
            if (arrowType === true) setArrowType(false);
            if (event.target.value.length > 0) {
                setHasValue(true);
            } else {
                setSelectedOption('');
                setHasValue(false);
                setIsFocused(true);
            }
        }
        if (accordianResp && isDrawdown) {
            onClick({
                name: label.toLowerCase(),
                value: event.target.value,
                isDrawdown: isDrawdown,
            });
            return;
        }
        if (accordianResp) {
            onClick({ name: label.toLowerCase(), value: event.target.value });
            return;
        }
        onClick(event.data);
    };

    const handlePaste = (event) => {
        onPaste(event);
    }

    const handleInputFocus = () => {
        setIsFocused(true);
        setHasValue(false);
    };

    const handleInputBlur = () => {
        if (inputValue.length > 0) {
            setHasValue(true);
        } else {
            setHasValue(false);
            setIsFocused(false);
        }
    };

    const togglePasswordVisibility = () => {
        setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
    };

    const toggleDrawdownVisibility = () => {
        if (!isDisabled) {
            setIsFocused(!isFocused);
            setArrowType(!arrowType);
        }
    };

    const handleDropdownSelection = (value, data) => {
        let event = {
            target: {
                value: value,
            },
            data,
        };
        handleInputChange(event);
        setHasValue(true);
        setSelectedOption(value);
        toggleDrawdownVisibility();
        setSelectedOptionIndex(-1);
        if (typeof onDrawdownSelect == 'function') {
            onDrawdownSelect(value, data);
        }
    };




    return (
        <div
            className={
                error
                    ? 'input-container-error'
                    : `input-container ${customClass} ${isDisabled ? 'disabled' : ''} ${isFocused ? 'focused' : ''
                    } ${isBoxType == "icon" ? 'borderfocused' : ''} ${hasValue ? 'hasValue' : ''}`
            }
            style={{ ...customClass, backgroundColor: isDisabled ? "rgb(244, 244, 244)" : "" }}
        >
            {isDrawdown ? (
                <>
                    {(isFocused || hasValue) && (
                        <div
                            className={`${isBoxType === "icon" ? "input-headingdropdown" : "input-heading"}  ${isFocused ? 'focused' : ''} ${hasValue ? 'hasValue' : ''
                                }`}
                        >
                            {`${label}`}
                            {isRequired && <div className="Important-Star-input">*</div>}
                        </div>
                    )}
                    {isBoxType == "icon" && (
                        <span style={customButtonStyle} className="successicondropdown">
                            <img src={CustomIcon} alt='Success Icon' />
                        </span>
                    )}
                    <input
                        type={inputType}
                        className={`${isBoxType === "icon" ? "custom-inputdropdown" : "custom-input"} ${isFocused ? 'focused' : ''}`}
                        placeholder={
                            placeholder && placeholder.length > 0 ? placeholder : label
                        }
                        id={id}
                        autoComplete="off"
                        disabled={isDisabled}

                        value={inputValue}
                        onChange={(e) => {
                            handleInputChange(e);
                        }}
                        onFocus={(e) => {
                            handleInputFocus(e);
                            toggleDrawdownVisibility(e);
                        }}



                    />
                    {error ? (
                        <div className={`error-message ${isFocused ? 'focused' : ''}`}>
                            {helperText}
                        </div>
                    ) : null}
                    {!arrowType && (
                        <div
                            className="dropdown-options"
                            ref={newRef}
                            key={`${label}-dropdown-options`}
                            style={{ minHeight: dropdownHeight, ...customDropdownClass }}
                        >
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option, index) => (
                                    <div
                                        className={`dropdown-options-div ${selectedOptionIndex === index ? 'selected' : ''
                                            }`}
                                        key={`${label}${index}`}
                                        id={`option-${index}`}
                                        ref={
                                            selectedOptionIndex === index
                                                ? selectedOptionElement
                                                : null
                                        }
                                        onClick={() =>
                                            handleDropdownSelection(option.label, option)
                                        }
                                    >
                                        {drawdownNextLine ? (
                                            <span style={{ marginLeft: "11px" }}>
                                                <span style={{ fontWeight: "bold" }}>
                                                    {option.label.split('-')[0].trim()}
                                                </span>
                                                <br />
                                                {option.label.split('-')[1] ? option.label.split('-')[1].trim() : ""}
                                            </span>
                                        ) : (
                                            <span style={{ marginLeft: "11px" }}>{option.label}</span>
                                        )}
                                        {selectedOption === option.label && (
                                            <img src={check} alt="check" />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className={`dropdown-options-div`}>
                                    <span style={{ marginLeft: '11px' }}>No Record</span>
                                </div>
                            )}
                        </div>
                    )}
                    <span className="password-toggle" onClick={toggleDrawdownVisibility}>
                        <img src={arrowType ? downArrow : upArrow} alt="arrow" />
                    </span>
                </>
            ) : (
                <>
                    {(isFocused || hasValue) && (
                        <div
                            className={`input-heading ${isFocused ? 'focused' : ''} ${hasValue ? 'hasValue' : ''
                                }`}
                        >
                            {label}
                            {isRequired && <div className="Important-Star-input">*</div>}
                        </div>
                    )}
                    <input
                        type={inputType}
                        onWheel={(e) => e.target.blur()}
                        onKeyDown={(event) => {
                            if (inputType === "number" && event.key === "e") {
                                event.preventDefault();
                            }
                            if (event.key === 'Enter') {
                                onKeyPress(event);
                            }

                        }}
                        className={`custom-input ${isFocused ? 'focused' : ''}`}
                        style={{ ...customInputClass, backgroundColor: isDisabled ? "rgb(244, 244, 244)" : "" }}
                        placeholder={
                            placeholder && placeholder.length > 0 ? placeholder : label
                        }
                        id={id}
                        autoComplete="off"
                        disabled={isDisabled}
                        value={initialValue}
                        onChange={handleInputChange}
                        onFocus={isReadOnly ? null : handleInputFocus}
                        onBlur={isReadOnly ? null : handleInputBlur}
                        onPaste={handlePaste}
                        readOnly={isReadOnly}
                    />

                    {isSearch && (
                        <span className="password-toggle" onClick={onClick}>
                            <img src={SearchIcon} alt="Search Icon" />
                        </span>
                    )}
                    {isPassword && (
                        <span
                            className="password-toggle"
                            onClick={togglePasswordVisibility}
                        >
                            <img
                                src={inputType === 'password' ? EyeIcon : EyeSlashIcon}
                                alt="Eye Icon"
                            />
                        </span>
                    )}
                    {error ? (
                        <div className={`error-message ${isFocused ? 'focused' : ''}`} style={customhelperTextStyle}>
                            {helperText}
                        </div>
                    ) : null}
                    {isBoxType == "button" && (
                        <span style={customButtonStyle} className="buttonstyle" onClick={isDisabled ? null : onClick}>
                            <button style={{ backgroundColor: isDisabled ? "rgb(244, 244, 244)" : "white", border: "none", color: isDisabled ? "#CCCDD3" : "#134CDE", fontSize: "14px", padding: "10px 10px", fontWeight: "600", height: "100%", cursor: "pointer" }}>{Buttonlabel}</button>
                        </span>
                    )}
                    {isBoxType == "loader" && (
                        <span style={customButtonStyle} className="loadersrotation" onClick={onClick}>
                            <div className="loader"></div>
                        </span>
                    )}
                    {isBoxType == "icon" && (
                        <span style={customButtonStyle} className="successicon" onClick={onClick}>
                            <img src={CustomIcon} alt='Success Icon' />
                        </span>
                    )}
                </>
            )}
        </div>
    );
}

InputBox.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.string,
    onClick: PropTypes.func,
    customClass: PropTypes.string,
    customInputClass: PropTypes.string,
    customDropdownClass: PropTypes.string,
    customErrorStyle: PropTypes.string,
    isDisabled: PropTypes.bool,
    isPassword: PropTypes.bool,
    isDropdown: PropTypes.bool,
    isSearch: PropTypes.bool,
    initialValue: PropTypes.any,
    accordianResp: PropTypes.bool,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    placeholder: PropTypes.string,
    isRequired: PropTypes.bool,
    drawdownNextLine: PropTypes.bool,
    Buttonlabel: PropTypes.string,
    customButtonStyle: PropTypes.string,
    isBoxType: PropTypes.string,
    filterOption: PropTypes.bool
};
