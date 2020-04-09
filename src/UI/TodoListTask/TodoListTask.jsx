import React, { useState } from 'react';
import  './TodolistTask.css';

const TodoListTask = ({ task, changeStatus, todoListId, changeTitle, deleteTask }) => {
    const [activeMode, setActiveMode] = useState(false)
    const [newTitle, setNewTitle] = useState(task.title)
    const onIsDoneChange = (e) => {
        changeStatus(task.id, e.currentTarget.checked)
    }
    const onTitleChanged = (e) => {
        let title = e.currentTarget.value
        changeTitle(task.id, title)
        setActiveMode(false)
    }
    const deleteTAsk = () => {
        deleteTask(todoListId, task.id)
    }
    const classForIsDone = task.isDone ? 'todoListTaskDone' : 'todoListTask'
    console.log(classForIsDone)
    return (
            <div className={classForIsDone}>
                <input type="checkbox" onChange={onIsDoneChange} checked={task.isDone} />
                {/* <span>{task.id + ' - '}</span> */}
                {!activeMode &&
                    <span className={'tasksDeleteButton'}>
                        <span onDoubleClick={() => setActiveMode(true)}>{task.title}</span>

                    </span>
                }
                {
                    activeMode && <input autoFocus={true} onBlur={onTitleChanged}
                        value={newTitle}
                        onKeyPress={(e) => { return (e.key === "Enter") ? onTitleChanged(e) : null }}
                        onChange={(e) => setNewTitle(e.currentTarget.value)} />
                }
                <button onClick={deleteTAsk}>X</button>
            </div>
    );
}

export default TodoListTask;

