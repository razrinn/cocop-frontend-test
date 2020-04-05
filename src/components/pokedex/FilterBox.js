import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import DropdownField from "../core/DropdownField";

const useStyles = createUseStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center"
    },
    text: {
        // marginTop: 0,
        marginRight: theme.space.sm
    },
}));
const FilterBox = (props) => {
    const { options, value, placeholder, handleChange, ...rest } = props;
    const theme = useTheme();
    const classes = useStyles({ theme });
    return (
        <div className={classes.root} {...rest}>
            <p className={classes.text}>Filter by {placeholder}</p>
            <DropdownField
                value={value}
                options={options}
                handleChange={handleChange}
            />
        </div>
    );
};

FilterBox.propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.string,
    placeholder: PropTypes.string,
    handleChange: PropTypes.func,
};

export default FilterBox;
