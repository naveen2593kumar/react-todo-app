/**
 * TODO State type
 */

import { IMessage } from "./message";
import { ITodo } from "./todo";

interface ITodoState {
    message?: IMessage | null;
    todos: ITodo[];
}