import React from "react";
import HomePage from "./containers/HomePage";
import { ThemeProvider } from "react-jss";

const theme = {
    color: {
        primary: "red",
        secondary: "blue"
    },
    fontSize: {
        xs: "8px",
        sm: "16px",
        md: "24px",
        lg: "48px"
    },
    space: {
        sm: "8px",
        md: "16px",
        lg: "32px"
    }
};
const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <HomePage />
        </ThemeProvider>
    );
};

export default App;
