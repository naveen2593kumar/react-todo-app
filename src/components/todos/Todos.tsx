import { Typography } from "@material-ui/core";
import { FC } from "react";
import { useSelector } from "react-redux";
import { ITodoState } from "../../model/todo-state";
import { RootState } from "../../redux/store";
import TodoCreationForm from "./TodoCreationForm";
import TodoItem from "./TodoItem";
import Message from "../message/Message";
import InfoBar from "../infobar/InfoBar";
import classes from "./Todos.module.css";
import TodoNotFound from "./TodoNotFound";

/**
 * A wrapper component for Todos functionalities
 */
const Todos: FC<{}> = () => {
    const { todos, message } = useSelector<RootState>(state => state.todos) as ITodoState;
    const showableTodo = todos.filter(todo => !todo.hide);

    return (
        <section className={classes.wrapper}>
            <Typography variant="h6" className={classes.title}>What to do next</Typography>
            <div className={classes.sticky}>
                <TodoCreationForm />
                <InfoBar />
            </div>
            <div className={classes.content}>
                {message && <Message message={message} />}
                {(!!showableTodo && showableTodo.length > 0) ?
                    showableTodo.map(todo => (<TodoItem key={todo.id} todo={todo} />)) :
                    <TodoNotFound title="TODOs not Found!" subtitle="Please add some, this will help you to manage your tasks!" />}
            </div>
        </section >);
};

export default Todos;