import React, { useState, useEffect } from 'react';
import './App.css';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';
import TodoListTitle from './TodoListTitle';
import AddNewItemForm from './addNewItemForm';
import { addNewTaskAC, setTasksAC, updateTaskAC, deleteTaskAC } from '../BLL/reducer';
import { connect } from 'react-redux';

const TodoList = ({ todoListId, deleteTodolist, title,
    tasks, addNewTask, setTasks, updateTask, deleteTask }) => {
    let [nextTaskId, setNextTaskId] = useState(1);
    let [filterValue, setFilterValue] = useState('All');
    useEffect(() => {
        restoreState()
    }, [])
    useEffect(() => {
        saveState()
    }, [tasks])
    let saveState = () => {
        let stateAsString = JSON.stringify(tasks)
        localStorage.setItem('hooksTodolistTasks' + todoListId, stateAsString)
    }
    let restoreState = () => {
        let tasks = []
        let stateAsString = localStorage.getItem('hooksTodolistTasks' + todoListId)
        if (stateAsString !== null) {
            tasks = JSON.parse(stateAsString);
        }
        tasks.forEach(t => {
            if (t.id >= nextTaskId) {
                setNextTaskId(t.id + 1)
            }
        })
        setTasks(todoListId, tasks)
    }
    const addTask = (title) => {
        let newTask = {
            id: nextTaskId,
            title: title,
            isDone: false,
            priority: 'high'
        };
        addNewTask(todoListId, newTask)
        setNextTaskId(nextTaskId + 1);
    }
    const changeTask = (taskId, obj) => {
        updateTask(todoListId, taskId, obj)
    }
    const changeTitle = (taskId, title) => {
        changeTask(taskId, { title })
    }
    const changeStatus = (taskId, isDone) => {
        changeTask(taskId, { isDone })
    }
    return (
        <div className='todoList'>
            <div className='todoList-header'>
                <TodoListTitle todoListId={todoListId} title={title} deleteTodolist={deleteTodolist}/>
                <AddNewItemForm addItem={addTask} />
            </div>
            <TodoListTasks changeStatus={changeStatus}
                changeTitle={changeTitle} deleteTask={deleteTask}
                todoListId={todoListId}
                tasks={tasks.filter(t => {
                    switch (filterValue) {
                        case 'All':
                            return t;
                        case 'Completed':
                            return t.isDone;
                        case 'Active':
                            return !t.isDone;
                        default:
                            return t;;
                    }
                })} />
            <TodoListFooter setFilterValue={setFilterValue} filterValue={filterValue} />
        </div>
    );
}

const mdtp = (dispatch) => {
    return {
        setTasks: (todoListId, tasks) => {
            dispatch(setTasksAC(todoListId, tasks))
        },
        addNewTask: (todoListId, newTask) => {
            dispatch(addNewTaskAC(todoListId, newTask))
        },
        updateTask: (todoListId, taskId, obj) => {
            dispatch(updateTaskAC(todoListId, taskId, obj))
        },
        deleteTask: (todoListId, taskId) => {
            dispatch(deleteTaskAC(todoListId, taskId))
        }      
    }

}
const ConnectedTodoList = connect(null, mdtp)(TodoList)

export default ConnectedTodoList;

