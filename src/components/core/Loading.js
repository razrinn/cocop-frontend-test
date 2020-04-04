import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from "react-jss";

const useStyles = createUseStyles(theme => ({
    root: {
        width: "100%"
    }
}));
const Loading = props => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    return (
        <div>
            
        </div>
    );
};

Loading.propTypes = {
    
};

export default Loading;