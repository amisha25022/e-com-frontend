import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Button.css';
import searchIcon from '../../assets/images/search-icon-default.svg';
import searchIconHover from '../../assets/images/search-icon-hovered.svg';
import iconContainedButton from '../../assets/images/icon-contained-default.svg';
import iconContainedButtonHover from '../../assets/images/icon-contained-hover.svg';

export default function Button({
    id,
    buttonType,
    customClass,
    customInvertClass,
    iconButton,
    label,
    onClick,
    invert,
    isDisabled,
    customStyle,
    imageButton,
    imageButtonHover,
    isLoading,
    customLoaderClass,
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [isDownloadHovered, setIsDownloadHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleDownloadMouseEnter = () => {
        setIsDownloadHovered(true);
    };

    const handleDownloadMouseLeave = () => {
        setIsDownloadHovered(false);
    };

    if (iconButton === 'icon-contained-button') {
        return (
            <button
                id={id}
                type="button"
                className={`btn btn-${buttonType.trim().toLowerCase()} ${customClass} ${invert ? 'invert' : ''
                    } ${invert ? customInvertClass : ''} ${label ? '' : 'label-less'}`}
                onClick={onClick}
                disabled={isDisabled}
                style={customStyle}
            >
                <div
                    className={`icon-contained-button ${isDisabled ? 'disabled' : ''}`}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    {label && <span className="label">{label}</span>}
                    <img
                        src={isHovered ? iconContainedButtonHover : iconContainedButton}
                        alt={isHovered ? 'icon-hovered' : 'icon-notHovered'}
                    />
                </div>
            </button>
        );
    }

    if (iconButton === 'icon') {
        return (
            <button
                id={id}
                type="button"
                className={`btn btn-${buttonType.trim().toLowerCase()} ${customClass} ${invert ? 'invert' : ''
                    } ${invert ? customInvertClass : ''} ${label ? '' : 'label-less'}`}
                onClick={onClick}
                disabled={isDisabled}
                style={customStyle}
            >
                {label && <span className="label">{label}</span>}
                <img
                    src={isHovered ? searchIconHover : searchIcon}
                    alt={isHovered ? 'hovered' : 'notHovered'}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
            </button>
        );
    }

    if (iconButton === 'btn-secondary-download-button') {
        return (
            <div
                onMouseEnter={handleDownloadMouseEnter}
                onMouseLeave={handleDownloadMouseLeave}
            >
                <button
                    id={id}
                    type="button"
                    className={`btn btn-${buttonType
                        .trim()
                        .toLowerCase()} ${customClass} ${invert ? 'invert' : ''} ${invert ? customInvertClass : ''
                        } ${label ? '' : 'label-less'}`}
                    onClick={onClick}
                    disabled={isDisabled}
                    style={customStyle}
                >
                    <img
                        src={isDownloadHovered ? imageButtonHover : imageButton}
                        alt={isDownloadHovered ? 'hovered' : 'notHovered'}
                    />
                    {label && <span className="label">{label}</span>}
                </button>
            </div>
        );
    }

    return (
        <button
            id={id}
            type="button"
            className={`btn btn-${buttonType.trim().toLowerCase()} ${customClass} ${invert ? 'invert' : ''
                } ${invert ? customInvertClass : ''} ${label ? '' : 'label-less'}`}
            onClick={onClick}
            disabled={isDisabled}
            style={customStyle}
        >
            {isLoading ? (
                <React.Fragment>
                    <div className="input-loader" style={{ ...customLoaderClass }} />
                </React.Fragment>
            ) : (
                <React.Fragment>
                    {label && <span className="label">{label}</span>}
                </React.Fragment>
            )}
        </button>
    );
}

Button.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    buttonType: PropTypes.oneOf(['primary', 'secondary', 'link-button'])
        .isRequired,
    iconButton: PropTypes.oneOf([
        'icon',
        'icon-contained-button',
        'btn-secondary-download-button',
    ]),
    label: PropTypes.string,
    customClass: PropTypes.string,
    customInvertClass: PropTypes.string,
    invert: PropTypes.bool,
    onClick: PropTypes.func,
    isDisabled: PropTypes.bool,
    customStyle: PropTypes.object,
    imageButton: PropTypes.object,
    imageButtonHover: PropTypes.string,
};
