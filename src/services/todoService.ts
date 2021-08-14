import { ITodo } from "../model/todo";

/**
 * fetching TODOs from perssitent location, in this case localStorage
 * @returns  {ITodo[]}
 */
export const fetchTodos = (): ITodo[] => {
    let todos: ITodo[] = [];
    try {
        const data = JSON.parse(localStorage.getItem('TODOS_LOCAL_STATE') || '[]');
        if (data) {
            (data as ITodo[]).forEach(todo => { todo.hide = false; });
            todos = data;
        }
    } catch (e) {
        console.error('Error Occured: ', e);
    }
    return todos;
}

/**
 * saving the todo state into localStorage
 * @param todos 
 */
export const persistTodos = (todos: ITodo[]) => {
    localStorage.setItem('TODOS_LOCAL_STATE', JSON.stringify(todos));
}

