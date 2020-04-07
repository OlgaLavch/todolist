import React, { useState } from 'react';
import './App.css';

const TodoListFooter = ({ filterValue, setFilterValue }) => {
    const [isHidden, setIsHidden] = useState(false)


    let classForAll = filterValue === "All" ? "filter-active" : "";
    let classForCompleted = filterValue === "Completed" ? "filter-active" : "";
    let classForActive = filterValue === "Active" ? "filter-active" : "";
    return (
        <div className="todoList-footer">
            {!isHidden && <>
                <button className={classForAll} onClick={() => setFilterValue('All')}>All</button>
                <button className={classForCompleted} onClick={() => setFilterValue('Completed')}>Completed</button>
                <button className={classForActive} onClick={() => setFilterValue('Active')}>Active</button>
                <span className='hideButtons' onClick={() => setIsHidden(true)}>hide</span>
            </>}
            {isHidden && <span className='hideButtons' onClick={() => setIsHidden(false)}>show</span> }
        </div>
    );
}

export default TodoListFooter;

