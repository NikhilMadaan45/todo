import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            title: "Todo 1",
            completed: false
        }
    ],
    addTodo: (title) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},
    updateTodo: (id, title) => {}
});

export const TodoContextProvider = TodoContext.Provider;

export const useTodo = () => {
    return useContext(TodoContext);
}
