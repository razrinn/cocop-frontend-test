import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from "react-jss";
import { CustomTheme } from '../../type';

const useStyles = createUseStyles((theme:CustomTheme) => ({
    root: {
        textTransform :"capitalize",
        border: "none",
        borderBottom: `2px solid ${theme.color.primary}`,
        color: theme.color.primary,
        cursor: "pointer",
        background: "transparent",
        fontSize: theme.fontSize.sm,
        fontWeight: "bold",
    },
    
}));
const DropdownField = (props:any) => {
    const {options, value, handleChange, ...rest} = props;
    const theme = useTheme();
    const classes = useStyles({ theme });
    return (
        <select className={classes.root} value={value} onChange={handleChange} {...rest}>
            <option value="All">All</option>
            {options.map((opt:string, index:number) => (
                <option key={index} value={opt}>{opt}</option>
            ))}
        </select>
    );
};

DropdownField.propTypes = {
    options: PropTypes.array.isRequired,
    value: PropTypes.string,
    handleChange: PropTypes.func
};

export default DropdownField;