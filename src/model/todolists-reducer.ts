// создание нового стейта

import {FilterValues, TodolistType} from "../App";


type DeleteTodolistAT = {
    type: 'DELETE_TODOLIST'
    payload: {
        id: string
    }
}

type CreateTodolistAT = {
    type: 'CREATE_TODOLIST'
    payload: {
        title: string
        id: string
    }
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE_TODOLIST_TITLE'
    payload: {
        id: string
        title: string
    }
}

type ChangeTodolistFilterAT = {
    type: 'CHANGE_TODOLIST_FILTER'
    payload: {
        id: string
        filter: FilterValues
    }
}

type ActionType = DeleteTodolistAT | CreateTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT

export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'DELETE_TODOLIST':
            return todolists.filter(todolist => todolist.id !== action.payload.id)

        case 'CREATE_TODOLIST':
            const newTodolist: TodolistType = {
                id: action.payload.id,
                title: action.payload.title,
                filter: 'all'
            }
            return [newTodolist, ...todolists]

        case 'CHANGE_TODOLIST_TITLE':
            return todolists.map(todolist => todolist.id === action.payload.id ? {
                ...todolist,
                title: action.payload.title
            } : todolist)

        case 'CHANGE_TODOLIST_FILTER':
            return todolists.map(todolist => todolist.id === action.payload.id ? {
                ...todolist,
                filter: action.payload.filter
            } : todolist)

        default:
            return todolists
    }
}


export const DeleteTodolistAC = (id: string): DeleteTodolistAT => {
    return ({
        type: 'DELETE_TODOLIST',
        payload: {
            id
        }
    })
}

export const CreateTodolistAC = (id: string,title: string): CreateTodolistAT => {
    return ({
        type: 'CREATE_TODOLIST',
        payload: {
            id: id, //сокращенно просто id
            title: title //сокращенно просто title
        }
    })
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => {
    return ({
        type: 'CHANGE_TODOLIST_TITLE',
        payload: {
            id,
            title
        }
    })
}

export const ChangeTodolistFilterAC = (id: string, filter: FilterValues): ChangeTodolistFilterAT => {
    return ({
        type: 'CHANGE_TODOLIST_FILTER',
        payload: {
            id,
            filter
        }
    })
}