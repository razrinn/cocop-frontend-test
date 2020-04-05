import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles(theme => ({
    root: {
        borderRadius: "4px",
        boxShadow: "none",
        border: `1px solid ${theme.color.black}`,
        fontSize: theme.fontSize.md,
        padding: theme.space.sm
    }
}));
const TextField = props => {
    const { value, handleChange, placeholder, ...rest } = props;
    const theme = useTheme();
    const classes = useStyles({ theme });

    return (
        <input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            onKeyDown={e => {
                if (e.keyCode === 13) handleChange(e);
            }}
            className={classes.root}
            {...rest}
        />
    );
};

TextField.propTypes = {
    value: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string
};

export default TextField;
