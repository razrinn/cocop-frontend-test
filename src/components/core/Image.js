import React from "react";
import PropTypes from "prop-types";

const Image = props => {
    const { src, alt, ...rest } = props;
    return <img src={src} alt={alt} {...rest} />;
};

Image.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string
};

export default Image;
