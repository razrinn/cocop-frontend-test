import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import Image from "../components/core/Image";
import PokeLogo from "../asset/pokemon-logo.png";
import CardContainer from "../components/pokedex/CardContainer";
import Button from "../components/core/Button";
import API from "../utils/API";
import axios from "axios";
import SearchBox from "../components/pokedex/SearchBox";
import PokemonDetail from "../components/pokedex/PokemonDetail";
import FilterBox from "../components/pokedex/FilterBox";
import LoadingSpinner from "../components/core/LoadingSpinner";

const useStyles = createUseStyles((theme) => ({
    root: {
        padding: theme.space.sm,
        background: theme.color.white,
        minHeight: "97vh",
    },
    logo: {
        display: "flex",
        margin: "0 auto",
        width: "300px",
    },
    content: {
        padding: theme.space.md,
    },
    label: {
        color: "gray",
    },
    value: {
        textTransform: "capitalize",
        marginTop: 0,
        fontWeight: "bold",
    },
    text: {
        margin: 0,
    },
    bold: {
        fontWeight: "bold",
    },
}));

const HomePage = () => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const [pokemons, setPokemons] = React.useState([]);
    const [filteredPokemons, setFilteredPokemons] = React.useState([]);
    React.useEffect(() => {
        setFilteredPokemons(pokemons);
    }, [pokemons]);
    const [search, setSearch] = React.useState("");
    const [filter, setFilter] = React.useState("All");
    const [filterOptions, setFilterOptions] = React.useState([]);
    React.useEffect(() => {
        const fetchData = async () => {
            const result = await API.get("type")
                // success
                .then((response) => {
                    const rawResults = response.data.results;
                    const finalResults = rawResults.map((res) => res.name);
                    return finalResults;
                })
                // Catch Error
                .catch((err) => console.log(err));
            setFilterOptions(result);
        };
        fetchData();
    }, []);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        setIsLoading(true);
        const fetchData = async () => {
            const result = await API.get("pokemon/?limit=10000")
                // success
                .then((response) => {
                    const rawResults = response.data.results;
                    const dataUrl = rawResults.map((res) => API.get(res.url));
                    return axios.all(dataUrl).then(
                        axios.spread((...response) => {
                            return response.map((res) => res.data);
                        })
                    );
                })
                // Catch Error
                .catch((err) => console.log(err));
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
        weight: 0,
    });
    const handleChangeInput = (event) => {
        const { value } = event.target;
        setSearch(value);
    };
    const handleClickSearch = () => {
        let filtered;
        if (filter === "All") {
            filtered = pokemons.filter((poke) =>
                poke.name.includes(search.toLowerCase())
            );
        } else {
            filtered = pokemons.filter(
                (poke) =>
                    poke.name.includes(search.toLowerCase()) &&
                    poke.types.some((type) => type.type.name === filter)
            );
        }
        setFilteredPokemons(filtered);
    };
    const handleChangeFilter = (event) => {
        const { value } = event.target;
        const filtered = pokemons.filter((poke) =>
            poke.types.some((type) => type.type.name === value)
        );
        if (value === "All") {
            setFilteredPokemons(pokemons);
        } else {
            setFilteredPokemons(filtered);
        }
        setFilter(value);
        setSearch("");
    };
    const handleLoadMore = () => {
        setLimit(limit + 20);
    };
    const handleClickCard = (index) => {
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
            weight: currentPokemon.weight,
        });
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
                <FilterBox
                    options={filterOptions}
                    placeholder="type"
                    value={filter}
                    handleChange={handleChangeFilter}
                />
                <p className={classes.text}>
                    Showing{" "}
                    <span className={classes.bold}>
                        {filteredPokemons.length}
                    </span>{" "}
                    results
                </p>
                {isLoading ? (
                    <LoadingSpinner loading={isLoading}/>
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
                <PokemonDetail
                    open={openModal}
                    handleCloseModal={handleCloseModal}
                    pokemon={selectedPokemon}
                />
            </div>
        </div>
    );
};

export default HomePage;
