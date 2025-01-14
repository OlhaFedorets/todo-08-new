import {v1} from 'uuid'
import type {TodolistType} from '../App'
import {
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    CreateTodolistAC,
    DeleteTodolistAC,
    todolistsReducer
} from './todolists-reducer'

test('correct todolist should be deleted', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    // 1. Стартовый state
    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // 2. Действие (action)
    const action = DeleteTodolistAC(todolistId1)
    //     {
    //     type: 'DELETE_TODOLIST',
    //     payload: {
    //         id: todolistId1,
    //     },
    // } as const
    const endState = todolistsReducer(startState, action)

    // 3. Проверка, что действие измененило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)
})


test('correct todolist should be created', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // const action = {
    //     type: 'CREATE_TODOLIST',
    //     payload: {
    //         id: v1(),
    //         title: 'New todolist'
    //     }
    // } as const

    const newTodoTitle = 'New todolist'
    const endState = todolistsReducer(startState, CreateTodolistAC(v1(), newTodoTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodoTitle)
})


test('correct todolist should change its title', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // const action = {
    //     type: 'CHANGE_TODOLIST_TITLE',
    //     payload: {
    //         id: todolistId2,
    //         title: 'New title'
    //     }
    // } as const

    const newTitle = 'New title'

    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2, newTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTitle)
})


test('correct todolist should change its filter', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // const action = {
    //     type: 'CHANGE_TODOLIST_FILTER',
    //     payload: {
    //         id: todolistId2,
    //         filter: 'completed'
    //     }
    // } as const
    const newChoosenFilter = 'completed'
    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2, newChoosenFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newChoosenFilter)
})


