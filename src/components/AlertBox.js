import Alert from '@mui/material/Alert';

export const AlertBox = props => {
    const { severity, msg, onClose, style } = props;

    return (
        <Alert
            severity={severity}
            sx={{
                position: "fixed",
                left: props.left ? "687px" : 0,
                right: 0,
                top: props.top ? props.top : '80px',
                margin: "auto",
                width: "max-content",
                zIndex: 9999,
                ...style
            }}
            onClose={() => onClose()}
        >
            {msg}
        </Alert>
    );
};
