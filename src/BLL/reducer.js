const SET_TODOLISTS = 'SET_TODOLISTS';
const ADD_TODOLIST = 'ADD_TODOLIST';
const DELETE_TODOLIST = 'DELETE_TODOLIST';
const SET_TASKS = 'SET_TASKS';
const ADD_TASK = 'ADD_TASK';
const UPDATE_TASK = 'UPDATE_TASK';
const DELETE_TASK = 'DELETE_TASK';

const initialState = {
    todolists: [
        // {
        //     id: 0, title: 'monday', tasks: [
        //         { "id": 0, "title": "5", "isDone": false, "priority": "high" },
        //         { "id": 1, "title": "6", "isDone": true, "priority": "high" },
        //         { "id": 2, "title": "7", "isDone": false, "priority": "high" },
        //         { "id": 3, "title": "8", "isDone": false, "priority": "high" }
        //     ]
        // },
        // {
        //     id: 1, title: 'tuesday', tasks: [
        //         { "id": 0, "title": "5", "isDone": false, "priority": "high" },
        //         { "id": 1, "title": "6", "isDone": true, "priority": "high" },
        //         { "id": 2, "title": "7", "isDone": false, "priority": "high" },
        //         { "id": 3, "title": "8", "isDone": false, "priority": "high" }
        //     ]
        // },
        // {
        //     id: 2, title: 'wednesday', tasks: [
        //         { "id": 0, "title": "5", "isDone": false, "priority": "high" },
        //         { "id": 1, "title": "6", "isDone": true, "priority": "high" },
        //         { "id": 2, "title": "7", "isDone": false, "priority": "high" },
        //         { "id": 3, "title": "8", "isDone": false, "priority": "high" }
        //     ]
        // }
    ]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODOLISTS:
            let todoLists = action.newState.map((todo) => ({ ...todo, tasks: [] }));
            return {
                ...state, todolists: todoLists
            }
        case ADD_TODOLIST:
            return {
                ...state, todolists: [action.newTodoList, ...state.todolists]
            }
        case SET_TASKS:
            console.log(action)
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return { ...tl, tasks: action.tasks }
                    } else return tl
                })
            }
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return { ...tl, tasks: [action.newTask, ...tl.tasks] }
                    } else return tl
                })
            }
        case UPDATE_TASK:
            return {
                ...state,
                todolists: state.todolists.map( tl => {
                    if(tl.id === action.todolistId) {
                       return {...tl, tasks: tl.tasks.map( t => {
                           if(t.id === action.taskId) {
                               return {...t, ...action.obj}
                           } else return t
                       })}
                    } else return tl
                })
            }
            case DELETE_TODOLIST:
                return {
                    ...state,
                    todolists: state.todolists.filter( tl => {
                        return tl.id !== action.todolistId
                    })
                }
                case DELETE_TASK:
                    return {
                        ...state,
                        todolists: state.todolists.map( tl => {
                            if(tl.id === action.todolistId) {
                                return {
                                    ...tl, tasks: tl.tasks.filter( t => {
                                        return t.id !== action.taskId
                                    })
                                }
                            } else return tl
                        })
                    }
        default:
            return state;
    }
}

export const setTodolistsAC = (newState) => ({ type: SET_TODOLISTS, newState })
export const addTodolistAC = (newTodoList) => ({ type: ADD_TODOLIST, newTodoList })
export const deleteTodolistAC = (todolistId) => ({ type: DELETE_TODOLIST, todolistId })
export const setTasksAC = (todolistId, tasks) => ({ type: SET_TASKS, todolistId, tasks })
export const addNewTaskAC = (todolistId, newTask) => ({ type: ADD_TASK, todolistId, newTask })
export const updateTaskAC = (todolistId, taskId, obj) => ({ type: UPDATE_TASK, todolistId, taskId, obj })
export const deleteTaskAC = (todolistId, taskId) => ({ type: DELETE_TASK, todolistId, taskId })

export default reducer;