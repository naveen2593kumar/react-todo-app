import { FC } from "react";
import classes from "./Header.module.css";

/**
 * This is a Header component
 */
const Header: FC = () => (
    <header className={classes.header}>
        React TODO App
    </header>
);

export default Header;