import React from 'react';
import PropTypes from 'prop-types';

const Button = props => {
    const {text, onClick, variant, disabled} = props;
    return (
        <button onClick={onClick}>{text}</button>
    );
};

Button.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    variant: PropTypes.string,
    disabled: PropTypes.bool,
};

export default Button;