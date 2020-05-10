import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import TextField from "../core/TextField";
import SearchIcon from "../../asset/search.png";
import Image from "../core/Image";
import { CustomTheme } from "../../type";

const useStyles = createUseStyles((theme:CustomTheme) => ({
    root: {
        display: "flex",
        justifyContent: "center"
    },
    searchButton: {
        padding: theme.space.md,
        marginLeft: theme.space.sm,
        backgroundColor: theme.color.primary,
        borderRadius: "4px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center"
    },
    searchIcon: {
        width: "24px"
    }
}));

const SearchBox = (props:any) => {
    const { value, handleChangeInput, handleClickSearch, ...rest } = props;
    const theme = useTheme();
    const classes = useStyles({ theme });
    return (
        <div className={classes.root} {...rest}>
            <TextField
                placeholder="Search pokemon"
                value={value}
                handleChange={handleChangeInput}
            />
            <div className={classes.searchButton} onClick={handleClickSearch}>
                <Image src={SearchIcon} className={classes.searchIcon} />
            </div>
        </div>
    );
};

SearchBox.propTypes = {
    value: PropTypes.string,
    handleChangeInput: PropTypes.func,
    handleClickSearch: PropTypes.func
};

export default SearchBox;
