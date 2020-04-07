import React, { useState } from 'react';
import './App.css';

const AddNewItemForm = ({ addItem }) => {

    const [error, setError] = useState(false);
    const [titleValue, setTitleValue] = useState('');

    const onAddItemClick = () => {
        let title = titleValue;
        if (title.trim() !== '') {
            addItem(title);
        } else { setError(true) }
        setTitleValue('');
    };
    const onTitleChange = (e) => {
        setError(false);
        setTitleValue(e.currentTarget.value);
    };
    return (
        <div className="todoList-header">
            <div className="todoList-newTaskForm">
                <input onKeyPress={(e) => { return (e.key === "Enter") ? onAddItemClick() : null }}
                    onChange={onTitleChange}
                    value={titleValue}
                    placeholder='New item name'
                    className={error ? 'error' : null}
                    type="text" />
                <button onClick={onAddItemClick}>Add</button>
            </div>
        </div>
    );
}

export default AddNewItemForm;

