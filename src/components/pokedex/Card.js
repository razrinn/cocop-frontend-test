import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles, useTheme } from "react-jss";
import Image from '../core/Image';
import Button from '../core/Button';


const useStyles = createUseStyles(theme => ({
    root: {
        flex: "20%",
        maxWidth: "20%",
    },
    '@media only screen and (max-width: 480px)': {
      root: {
        flex: "100%",
        maxWidth: "100%",
      }  
    },
    '@media only screen and (min-width: 481px) and (max-width: 1024px)': {
        root: {
          flex: "50%",
          maxWidth: "50%",
        }  
      },
    content: {
        backgroundColor: theme.color.primary,
        padding: theme.space.sm,
        margin: theme.space.sm,
        borderRadius: 4
    },
    text: {
        margin: 0,
        fontSize: theme.fontSize.sm,
        color: theme.color.primary,
        backgroundColor: theme.color.secondary,
        padding: `8px 0`,
        textAlign: "center",
        borderRadius: 4
    }
}));
const Card = props => {
    const {name, image} = props
    const theme = useTheme();
    const classes = useStyles({ theme });
    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <Image style={{width: "100%"}} src={image} />
                <p className={classes.text}>{name}</p>
                <Button text="See details" onClick={() => alert("clicked")} />
            </div>
        </div>
    );
};

Card.propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
};

export default Card;