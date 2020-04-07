import React from 'react';
import './App.css';
import TodoListTask from './TodoListTask/TodoListTask';

const TodoListTasks = ({tasks, changeStatus, deleteTask, todoListId, changeTitle}) => {
    const tasksElements = tasks.map(t => <TodoListTask changeStatus={changeStatus}
        changeTitle={changeTitle} deleteTask={deleteTask}
        todoListId={todoListId}
         key={t.id} task={t}/>)
    return (
        <div className="todoList-tasks">
            {tasksElements}
        </div>
    );
}

export default TodoListTasks;

