import { FC } from "react";
import { Checkbox, IconButton, Paper, Typography } from "@material-ui/core";
import { Delete as DeleteIcon } from "@material-ui/icons";
import { useDispatch } from "react-redux";

import { ITodo } from "../../model/todo";
import { AppDispatch } from "../../redux/store";
import { deleteTodo, toggleTodo } from "../../redux/todo";

import classes from "./TodoItem.module.css";

export interface ITodoItemProps {
    todo: ITodo;
}

/**
 * Single Todo Item component
 */
const TodoItem: FC<ITodoItemProps> = ({ todo }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleTodoToggle = () => {
        dispatch(toggleTodo(todo.id));
    };

    const handleTodoDelete = () => {
        dispatch(deleteTodo(todo.id));
    };

    return (
        <Paper
            elevation={3}
            className={classes.wrapper}
            style={{
                backgroundColor: todo.completed ? '#ddd' : '#fff',
            }}>
            <Checkbox
                color="primary"
                checked={todo.completed}
                onChange={handleTodoToggle} />
            <Typography style={{
                flex: 1,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#555' : '#000',
            }}>{todo.description}</Typography>
            <IconButton
                color="primary"
                size="medium"
                onClick={handleTodoDelete}
                aria-label="Delete Todo">
                <DeleteIcon fontSize="small" />
            </IconButton>
        </Paper>
    )
};

export default TodoItem;