import { FormEvent, useRef } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Paper, TextField } from "@material-ui/core";
import {
    PlaylistAdd as PlaylistAddIcon
} from "@material-ui/icons";


import { AppDispatch } from "../../redux/store";
import { addTodo } from "../../redux/todo";
import classes from "./TodoCreationForm.module.css";

/**
 * Add todo form
 * for more complex form better to use Formik and Yup 
 * but this is a fairly simple form hence using plain form
 */
const TodoCreationForm = () => {
    const todoDescInput = useRef<HTMLInputElement>();
    const dispatch = useDispatch<AppDispatch>();

    const handleAddTodo = async (e: FormEvent) => {
        e.preventDefault(); // preventing form submision redirections
        const descValue = todoDescInput.current?.value || '';
        await dispatch(addTodo(descValue));
        if (todoDescInput.current?.value) {
            todoDescInput.current.value = ''; // to clear the input field after adding the TodoItem
        }
    }

    return (
        <Paper className={classes.wrapper}>
            <form className={classes.form} onSubmit={handleAddTodo}>
                <TextField
                    variant="outlined"
                    inputRef={todoDescInput}
                    size="small"
                    className={classes.field}
                    placeholder="Task description"
                    inputProps={{
                        'data-testid': "todoTextField"
                    }}
                />
                <IconButton
                    data-testid="addTodoButton"
                    color="primary"
                    edge="end"
                    size="medium"
                    type="submit"
                    aria-label="Add Todo">
                    <PlaylistAddIcon fontSize="small" />
                </IconButton>
            </form>
        </Paper>
    );
}

export default TodoCreationForm;