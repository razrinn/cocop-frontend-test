import React from "react";
import PropTypes from "prop-types";
import { createUseStyles, useTheme } from "react-jss";
import Card from "./Card";

const useStyles = createUseStyles(theme => ({
    root: {
        // padding: theme.space.md
    },
    wrapper: {
        display: "flex",
        flexWrap: "wrap"
    }
}));

const CardContainer = props => {
    const { data, limit, handleClick, ...rest } = props;
    const theme = useTheme();
    const classes = useStyles({ theme });
    return (
        <div className={classes.root} {...rest}>
            <div className={classes.wrapper}>
                {data.slice(0, limit).map((pokemon, i) => (
                    <Card
                        key={pokemon.name}
                        name={pokemon.name}
                        image={pokemon.sprites.front_default}
                        handleClick={() => handleClick(i)}
                    />
                ))}
            </div>
        </div>
    );
};

CardContainer.propTypes = {
    data: PropTypes.array.isRequired,
    limit: PropTypes.number.isRequired,
    handleClick: PropTypes.func
};

export default CardContainer;
