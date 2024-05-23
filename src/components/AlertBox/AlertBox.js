import React, { useState, useEffect } from 'react';
import './AlertBox.css';
import error from '../../assets/images/error-24.svg';
import success from '../../assets/images/success-35.svg';
import info from '../../assets/images/info-57.svg';
import warning from '../../assets/images/warning.svg';

const Alert = ({ severity, message, handleClose, style = {} }) => {
    const [color, setColor] = useState('red');
    const [icons, setIcons] = useState(null);
    const [text, setText] = useState(null);
    const [bgColor, setBgColor] = useState(null);

    const styles = useStyles({ color, bgColor });

    useEffect(() => {
        switch (severity) {
            case 'error':
                setColor('#D92B2B');
                setIcons(error);
                setText('Error');
                setBgColor('rgb(247,224,225)');
                break;

            case 'info':
                setColor('#4d94ff');
                setIcons(info);
                setText('Info');
                setBgColor('rgb(230, 240, 255)');
                break;

            case 'success':
                setColor('#22A53F');
                setIcons(success);
                setText('Successful');
                setBgColor('#F4FEF7');
                break;

            case 'warning':
                setColor('#e77b00');
                setIcons(warning);
                setText('Warning');
                setBgColor('rgb(255, 235, 214)');

            default:
        }
    }, [severity]);

    useEffect(() => {
        setTimeout(() => {
            handleClose();
        }, 2500);
    }, []);

    return (
        <React.Fragment>
            <div className="styleParentDiv" style={{ ...styles.parentDiv, ...style }}>
                <div style={styles.childDiv}>
                    <div
                        style={{
                            textAlign: 'center',
                            verticalAlign: 'center',
                            marginTop: '20px',
                        }}
                    >
                        {icons && (
                            <img style={styles.iconImage} src={icons} alt={severity} />
                        )}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            marginLeft: '5px',
                            marginTop: '20px',
                        }}
                    >
                        <p
                            style={{
                                color: color,
                                fontWeight: 'bold',
                                fontSize: '18px',
                                margin: 0,
                                padding: 0,
                                fontFamily: 'Montserrat-Regular',
                            }}
                        >
                            {text}
                        </p>
                    </div>
                    <button onClick={handleClose} style={styles.buttonStyle}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M1 1L15.2418 15.0418"
                                stroke="#1A1A1A"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M15.2422 1L1.00039 15.0418"
                                stroke="#1A1A1A"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                <div style={styles.childDiv}>
                    <div style={{ textAlign: 'center', verticalAlign: 'center' }} />

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            marginLeft: '5px',
                        }}
                    >
                        <p style={{ color: '#1F1F1F', fontFamily: 'Montserrat-Regular' }}>
                            {message}
                        </p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Alert;

const useStyles = ({ color, bgColor }) => {
    return {
        parentDiv: {
            border: `1.2px solid ${color}`,
            backgroundColor: bgColor,
        },

        childDiv: {
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: '5% 85% 10%',
        },

        iconImage: {
            height: '24px',
            width: '24px',
        },

        buttonStyle: {
            color: '#272827',
            fontSize: '16px',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
        },
    };
};
