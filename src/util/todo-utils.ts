import { v4 as uuid } from "uuid";
import { ITodo } from "../model/todo";

/**
 * Validate Todo description
 * @param todoDesc 
 * @returns {boolean}
 */
export const isValidTodoDescription = (todoDesc: string): boolean => {
    if (!todoDesc) return false;
    // [TODO] other possible validations
    return true;
}

/**
 * Check whether todo already exists or not
 * @param description 
 * @returns {boolean}
 */
export const isTodoAlreadyExist = (description: string, todos: ITodo[]) => {
    return todos.some(todo => todo.description.toLowerCase() === description.toLowerCase());
}

/**
 * Generate a TODO with given details and defaults
 * @param description 
 * @returns {ITodo}
 */
export const generateTodo = (description: string): ITodo => ({
    description,
    completed: false,
    id: uuid(),
})

/**
 * process the todos and generate a map for state All, Done & Pending
 * @param todos 
 * @returns {Object} 
 */
export const countMapper = (todos: ITodo[]) => {
    return todos.reduce((acc, todo) => {
        if (todo.completed) {
            acc.Done += 1;
        } else {
            acc.Pending += 1;
        }
        return acc;
    }, { 'Done': 0, 'Pending': 0, 'All': todos.length }) as { [key: string]: number };
}
