import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITodoState } from "../model/todo-state";
import msgGen from "../util/message-generator";
import { isTodoAlreadyExist, isValidTodoDescription, generateTodo } from "../util/todo-utils";
import { fetchTodos, persistTodos } from "../services/todoService";

const initialState: ITodoState = {
    message: null,
    todos: fetchTodos(),
};

/**
 * REDUX_SLICE (ACTIONS + REDUCER): This is the to update the store state
 */
const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo(state, { payload: description }: PayloadAction<string>) {
            // validations before adding the TODO
            if (!isValidTodoDescription(description)) {
                state.message = msgGen.errorMessage('Invalid todo!');
                return state;
            }

            if (isTodoAlreadyExist(description, state.todos)) {
                state.message = msgGen.warningMessage(`Todo "${description}" already exists!`);
                return state;
            }

            const todo = generateTodo(description); // to generalize the TODO generation

            state.todos.push(todo);
            state.message = msgGen.successMessage(`Todo Added!`);
            persistTodos(state.todos);
            return state;
        },
        deleteTodo(state, { payload: id }: PayloadAction<string>) {
            state.todos = state.todos.filter(todo => todo.id !== id); // FilteredOut the selected Item
            state.message = msgGen.successMessage(`Todo Removed!`);
            persistTodos(state.todos);
            return state;
        },
        toggleTodo(state, { payload: id }: PayloadAction<string>) {
            const targetedTodo = state.todos.find(todo => todo.id === id);

            if (targetedTodo) {
                targetedTodo.completed = !targetedTodo?.completed;
                if (targetedTodo.completed) {
                    state.message = msgGen.successMessage(`Todo "${targetedTodo.description}" completed!`);
                } else {
                    state.message = msgGen.infoMessage(`Todo "${targetedTodo.description}" is pending!`);
                }
                persistTodos(state.todos);
                return state;
            }
        },
        filterTodo(state, { payload: filter }: PayloadAction<string>) {
            switch (filter) {
                case 'Done':
                    state.todos.forEach(todo => {
                        todo.hide = !todo.completed; // hiding the pending todos, showing only Done
                    });
                    break;
                case 'Pending':
                    state.todos.forEach(todo => {
                        todo.hide = todo.completed; // hiding the Done todos, showing only Pending
                    });
                    break;
                default:
                    state.todos.forEach(todo => {
                        todo.hide = false; // hiding nothing, showing all
                    });
                    break;
            }
            state.message = msgGen.successMessage(`Todo Filtered!`);
            persistTodos(state.todos);
            return state;
        }
    }
});

export const { addTodo, deleteTodo, toggleTodo, filterTodo } = todoSlice.actions;
export default todoSlice.reducer;