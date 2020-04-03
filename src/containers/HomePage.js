import React from "react";
import { createUseStyles, useTheme } from "react-jss";
import Image from "../components/core/Image";
import PokeLogo from "../asset/pokemon-logo.png";
import CardContainer from "../components/pokedex/CardContainer";
import Button from "../components/core/Button";
import API from '../utils/API';
import axios from 'axios';

const useStyles = createUseStyles(theme => ({
    root: {
        padding: theme.space.sm
    },
    logo: {
        display: "flex",
        margin: "0 auto",
        width: "300px"
    }
}));
const HomePage = () => {
    const theme = useTheme();
    const classes = useStyles({ theme });
    const [pokemons, setPokemons] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        API.get('?limit=964')
            // If success
            .then(response => {
                const rawResults = response.data.results
                const dataUrl = rawResults.map(res => API.get(res.url));
                axios.all(dataUrl)
                    .then(axios.spread((...response) => {
                        const finalResults = response.map(res => res.data);
                        setPokemons(finalResults);
                    }))
            })
            // Catch Error
            .catch(err => console.log(err))
    }, []);
    const [limit, setLimit] = React.useState(20);

    const handleLoadMore = () => {
        setLimit(limit + 20);
    }
    return (
        <div className={classes.root}>
            <Image className={classes.logo} src={PokeLogo} />
            <CardContainer data={pokemons} limit={limit} />
            <Button text="Load more" onClick={handleLoadMore}/>
        </div>
    );
};

export default HomePage;
