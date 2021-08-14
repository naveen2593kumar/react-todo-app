import { FC } from "react";
import { CssBaseline } from "@material-ui/core";

import classes from "./App.module.css";

import Header from "./components/header/Header";
import Todos from "./components/todos/Todos";

import store from "./redux/store";
import { Provider } from "react-redux";

/**
 * This is a wrapper component for our App
 */
const App: FC<{}> = () => (
    <div className={classes.wrapper}>
        <Provider store={store}>
            <CssBaseline />
            <main className={classes.content}>
                <Header />
                <Todos />
            </main>
        </Provider>
    </div>
);

export default App;