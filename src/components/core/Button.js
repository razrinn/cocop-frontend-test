import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles(theme => ({
    button: {
        margin: theme.space.md,
        cursor: "pointer",
        color: theme.color.primary,
        fontSize: theme.fontSize.md,
        fontWeight: "bold"
    },
    center: {
        textAlign: "center",
    }
}));
const Button = props => {
    const { text, onClick, disabled, ...rest } = props;
    const theme = useTheme();
    const classes = useStyles({ theme });
    return (
        <p className={classes.center}>
            <span onClick={onClick} className={classes.button} {...rest}>
                {text}
            </span>
        </p>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

export default Button;
