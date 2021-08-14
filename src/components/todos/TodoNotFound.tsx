import { FC } from "react";
import { Typography } from "@material-ui/core";
import { SentimentSatisfied as SentimentSatisfiedIcon } from "@material-ui/icons";

import classes from "./TodoNotFound.module.css";

interface ITodoNotFoundProps {
    title: string,
    subtitle: string,
}

/**
 * this comonent represents that there is no TODO item
 */
const TodoNotFound: FC<ITodoNotFoundProps> = ({ title, subtitle }) => (
    <section className={classes.wrapper}>
        <SentimentSatisfiedIcon className={classes.icon}/>
        <Typography variant="h6" className={classes.title}>{title}</Typography>
        <Typography variant="body2" className={classes.subtitle}>{subtitle}</Typography>
    </section>
);

export default TodoNotFound;