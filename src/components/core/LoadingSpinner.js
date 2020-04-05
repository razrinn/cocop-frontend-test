import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import BeatLoader from "react-spinners/BeatLoader";

const useStyles = createUseStyles((theme) => ({
    root: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    text: {
        color: theme.color.primaryDark,
        fontWeight: "bold"
    }
}));
const LoadingSpinner = (props) => {
    const { loading, size, ...rest } = props;
    const theme = useTheme();
    const classes = useStyles({ theme });
    return (
        <div className={classes.root}>
            <BeatLoader loading={loading} color="#327765" size={size} {...rest} />
            <p className={classes.text}>Fetching data, please wait ...</p>
        </div>
    );
};

LoadingSpinner.propTypes = {
    loading: PropTypes.bool.isRequired,
    size: PropTypes.number,
};

export default LoadingSpinner;
