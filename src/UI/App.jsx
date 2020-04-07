import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './TodoList.jsx'
import AddNewItemForm from './addNewItemForm';
import { connect } from 'react-redux';
import { addTodolistAC, setTodolistsAC, deleteTodolistAC } from '../BLL/reducer';

const App = ({todolists, addNewTodoList, deleteTodolist, setTodolists}) => {
    const [nextTodoListId, setNextTodoListId] = useState(0);
    useEffect(() => {
        restoreState()
    }, [])
    useEffect(() => {
        saveState()
    }, [todolists])
    const saveState = () => {
        let stateAsString = JSON.stringify(todolists)
        localStorage.setItem('hooksTodolist', stateAsString)
    }
    const restoreState = () => {
        let todolists = []
        let stateAsString = localStorage.getItem('hooksTodolist')
        if (stateAsString !== null) {
            todolists = JSON.parse(stateAsString);
        }
        todolists.forEach(tl => {
            if (tl.id >= nextTodoListId) {
                setNextTodoListId(tl.id + 1)
            }
        })
        setTodolists(todolists)
    }
    const addTodoList = (title) => {
        let newTodoList = {
            id: nextTodoListId,
            title: title,
            tasks: []
        };
        addNewTodoList(newTodoList);
        setNextTodoListId(nextTodoListId + 1);
    }
    return (
        <>
            <div>
                <AddNewItemForm addItem={addTodoList}/>
            </div>
            <div className="App">

                {todolists.map(tl => <TodoList tasks={tl.tasks}
                key={tl.id} deleteTodolist={deleteTodolist}
                todoListId={tl.id} title={tl.title} />)}
            </div>
        </>
    );
}
const mstp = (state) => {
    return {
        todolists: state.todolists
    }
}
const mdtp = (dispatch) => {
    return {
        setTodolists: (newState) => {
            dispatch(setTodolistsAC(newState))
        },
        addNewTodoList: (newTodoList) => {
            dispatch(addTodolistAC(newTodoList))
        },
        deleteTodolist: (todoListId) => {
            dispatch(deleteTodolistAC(todoListId))
        }
    }

}
const ConnectedApp = connect(mstp, mdtp)(App)

export default ConnectedApp;

