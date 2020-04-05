import React from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import { createUseStyles, useTheme } from "react-jss";
import Image from "../core/Image";

const useStyles = createUseStyles(theme => ({
    label: {
        color: "gray"
    },
    value: {
        textTransform: "capitalize",
        marginTop: 0,
        fontWeight: "bold"
    }
}));

const modalStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        minWidth: "300px",
        backgroundColor: "#ffedda"
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.8)"
    }
};
Modal.setAppElement("#root");
const PokemonDetail = props => {
    const { open, handleCloseModal, pokemon, ...rest } = props;
    const theme = useTheme();
    const classes = useStyles({ theme });
    return (
        <Modal
            isOpen={open}
            onRequestClose={handleCloseModal}
            style={modalStyles}
            {...rest}
        >
            <div style={{ textAlign: "center" }}>
                <Image src={pokemon.image} />
            </div>
            <div>
                <small className={classes.label}>Name</small>
                <p className={classes.value}>{pokemon.name}</p>
                <small className={classes.label}>Base Experience</small>
                <p className={classes.value}>
                    {pokemon.baseExperience}
                </p>
                <small className={classes.label}>Height</small>
                <p className={classes.value}>{pokemon.height}</p>
                <small className={classes.label}>Weight</small>
                <p className={classes.value}>{pokemon.weight}</p>
                <small className={classes.label}>Abilities</small>
                <p className={classes.value}>
                    {pokemon.abilities.map((ability, index) => (
                        <span key={index}>
                            {(index ? ", " : "") + ability.ability.name}
                        </span>
                    ))}
                </p>
                <small className={classes.label}>Stats</small>
                <p className={classes.value}>
                    {pokemon.stats.map((stat, index) => (
                        <span key={index}>
                            {(index ? ", " : "") +
                                `${stat.stat.name} (${stat.base_stat})`}
                        </span>
                    ))}
                </p>
                <small className={classes.label}>Types</small>
                <p className={classes.value}>
                    {pokemon.types.map((type, index) => (
                        <span key={index}>
                            {(index ? ", " : "") + type.type.name}
                        </span>
                    ))}
                </p>
            </div>
        </Modal>
    );
};

PokemonDetail.propTypes = {
    open: PropTypes.bool.isRequired,
    handleCloseModal: PropTypes.func.isRequired,
    pokemon: PropTypes.object,
};

export default PokemonDetail;
