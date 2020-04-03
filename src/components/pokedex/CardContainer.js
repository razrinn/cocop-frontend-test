import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import Card from "./Card";
import API from "../../utils/API";

const useStyles = createUseStyles(theme => ({
    root: {
        padding: theme.space.md
    },
    wrapper: {
        display: "flex",
        flexWrap: "wrap"
    }
}));



const CardContainer = props => {
    const { data, limit } = props;
    const theme = useTheme();
    const classes = useStyles({ theme });
    console.log(data)
    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                {data.slice(0, limit).map(pokemon => (
                    <Card
                        key={pokemon.name}
                        name={pokemon.name}
                        image={pokemon.sprites.front_default}
                    />
                ))}
            </div>
        </div>
    );
};

CardContainer.propTypes = {
    data: PropTypes.array.isRequired,
    limit: PropTypes.number.isRequired
};

export default CardContainer;
