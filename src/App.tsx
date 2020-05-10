import React from "react";
import HomePage from "./containers/HomePage";
import { ThemeProvider } from "react-jss";
import { CustomTheme } from "./type";


const theme: CustomTheme = {
    color: {
        primary: "#327765",
        primaryDark: "#2a6354",
        secondary: "#1EA5A2",
        black: "#1C1C1C",
        white: "#ffedda",
        gradientPrimary: "linear-gradient(40deg,#FFD86F,#D85836)",
        gradientSecondary: "linear-gradient(225deg, rgba(255,203,5,1) 0%, rgba(227,226,225,1) 100%)"
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
const App:React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <HomePage />
        </ThemeProvider>
    );
};

export default App;
