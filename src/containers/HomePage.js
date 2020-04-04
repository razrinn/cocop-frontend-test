import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import Image from "../components/core/Image";
import PokeLogo from "../asset/pokemon-logo.png";
import CardContainer from "../components/pokedex/CardContainer";
import Button from "../components/core/Button";
import API from "../utils/API";
import axios from "axios";
import Modal from "react-modal";
import SearchBox from "../components/core/SearchBox";

const useStyles = createUseStyles(theme => ({
    root: {
        padding: theme.space.sm,
        background: theme.color.white,
        minHeight: "100vh"
    },
    logo: {
        display: "flex",
        margin: "0 auto",
        width: "300px"
    },
    content: {
        padding: theme.space.md
    },
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
const HomePage = () => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const [pokemons, setPokemons] = React.useState([]);
    const [filteredPokemons, setFilteredPokemons] = React.useState([]);
    const [search, setSearch] = React.useState("");
    React.useEffect(() => {
        setFilteredPokemons(pokemons);
    }, [pokemons]);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const result = await API.get("?limit=964")
                // success
                .then(response => {
                    const rawResults = response.data.results;
                    const dataUrl = rawResults.map(res => API.get(res.url));
                    return axios.all(dataUrl).then(
                        axios.spread((...response) => {
                            return response.map(res => res.data);
                        })
                    );
                })
                // Catch Error
                .catch(err => console.log(err));
            setIsLoading(false);
            setPokemons(result);
        };
        fetchData();
    }, []);
    const [limit, setLimit] = React.useState(20);
    const [openModal, setOpenModal] = React.useState(false);
    const [selectedPokemon, setSelectedPokemon] = React.useState({
        name: "",
        image: "",
        abilities: [],
        baseExperience: 0,
        height: 0,
        stats: [],
        types: [],
        weight: 0
    });

    const handleChangeInput = event => {
        const { value } = event.target;
        setSearch(value);
    };
    const handleClickSearch = () => {
        const filtered = pokemons.filter(poke =>
            poke.name.includes(search.toLowerCase())
        );
        setFilteredPokemons(filtered);
    };
    const handleLoadMore = () => {
        setLimit(limit + 20);
    };
    const handleClickCard = index => {
        setOpenModal(true);
        const currentPokemon = filteredPokemons[index];
        setSelectedPokemon({
            name: currentPokemon.name,
            image: currentPokemon.sprites.front_default,
            abilities: currentPokemon.abilities,
            baseExperience: currentPokemon.base_experience,
            height: currentPokemon.height,
            stats: currentPokemon.stats,
            types: currentPokemon.types,
            weight: currentPokemon.weight
        });
        // alert(filteredPokemons[index].name);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };
    return (
        <div className={classes.root}>
            <Image className={classes.logo} src={PokeLogo} />
            <div className={classes.content}>
                <SearchBox
                    value={search}
                    handleChangeInput={handleChangeInput}
                    handleClickSearch={handleClickSearch}
                />
                {isLoading ? (
                    "LOADING"
                ) : (
                    <>
                        <CardContainer
                            data={filteredPokemons}
                            limit={limit}
                            handleClick={handleClickCard}
                        />
                        {limit > filteredPokemons.length ? null : (
                            <Button
                                text="Load more ..."
                                onClick={handleLoadMore}
                            />
                        )}
                    </>
                )}
                <Modal
                    isOpen={openModal}
                    onRequestClose={handleCloseModal}
                    style={modalStyles}
                >
                    <div style={{textAlign: "center"}}>
                        <Image src={selectedPokemon.image} />
                    </div>
                    <div>
                        <small className={classes.label}>Name</small> 
                        <p className={classes.value}>{selectedPokemon.name}</p>
                        <small className={classes.label}>Base Experience</small> 
                        <p className={classes.value}>{selectedPokemon.baseExperience}</p>
                        <small className={classes.label}>Height</small> 
                        <p className={classes.value}>{selectedPokemon.height}</p>
                        <small className={classes.label}>Weight</small> 
                        <p className={classes.value}>{selectedPokemon.weight}</p>
                        <small className={classes.label}>Abilities</small> 
                        <p className={classes.value}>
                            {
                                selectedPokemon.abilities.map((ability, index) => (
                                    <span key={index}>{ (index ? ', ' : '') + ability.ability.name }</span>
                                ))
                            }
                        </p>
                        <small className={classes.label}>Stats</small> 
                        <p className={classes.value}>
                            {
                                selectedPokemon.stats.map((stat, index) => (
                                    <span key={index}>{ (index ? ', ' : '') + `${stat.stat.name} (${stat.base_stat})`  }</span>
                                ))
                            }
                        </p>
                        <small className={classes.label}>Types</small> 
                        <p className={classes.value}>
                            {
                                selectedPokemon.types.map((type, index) => (
                                    <span key={index}>{ (index ? ', ' : '') + type.type.name }</span>
                                ))
                            }
                        </p>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default HomePage;
