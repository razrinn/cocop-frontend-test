import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles(theme => ({
    button: {
        margin: theme.space.md,
        cursor: "pointer",
        color: theme.color.primary,
        fontSize: theme.fontSize.md,
        textAlign: "center",
        fontWeigh: "bold"
    }
}));
const Button = props => {
    const {text, onClick, variant, disabled, ...rest} = props;
    const theme = useTheme();
    const classes = useStyles({ theme });
    return (
        <p className={classes.button} onClick={onClick} {...rest}>{text}</p>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.string,
    disabled: PropTypes.bool,
};

export default Button;