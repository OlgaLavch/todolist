import React from 'react';
import './App.css';

const TodoListTitle = ({ title, deleteTodolist, todoListId }) => {
    const deleteTodoList = () => {
        localStorage.removeItem('hooksTodolistTasks' + todoListId);
        localStorage.removeItem('hooksTodolist')
        deleteTodolist(todoListId)
    }
    return (
        <div className="todoList_header_title">
            <h3>{title}</h3>
            <button onClick={deleteTodoList}>X</button>
        </div>
    );
}

export default TodoListTitle;

