import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import Image from "../core/Image";
import Tilt from "react-tilt";

const useStyles = createUseStyles(theme => ({
    root: {
        flex: "20%",
        maxWidth: "20%",
        cursor: "pointer"
    },
    "@media only screen and (max-width: 480px)": {
        root: {
            flex: "100%",
            maxWidth: "100%"
        }
    },
    "@media only screen and (min-width: 481px) and (max-width: 1024px)": {
        root: {
            flex: "50%",
            maxWidth: "50%"
        }
    },
    content: {
        backgroundColor: theme.color.primary,
        padding: theme.space.sm,
        margin: theme.space.md,
        borderRadius: 4,
        boxShadow: `3px 3px 3px ${theme.color.black}`
    },
    text: {
        margin: 0,
        fontSize: theme.fontSize.sm,
        backgroundColor: theme.color.primaryDark,
        color: theme.color.white,
        padding: `8px 0`,
        textAlign: "center",
        borderRadius: 4,
        textTransform: "capitalize",
        fontWeight: "bold"
    }
}));
const Card = props => {
    const { name, image, handleClick, ...rest } = props;
    const theme = useTheme();
    const classes = useStyles({ theme });
    return (
        <div className={classes.root} onClick={handleClick}>
            <Tilt>
                <div className={classes.content} {...rest}>
                    <Image style={{ width: "100%" }} src={image} />
                    <p className={classes.text}>{name}</p>
                </div>
            </Tilt>
        </div>
    );
};

Card.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    handleClick: PropTypes.func
};

export default Card;
