import {TasksStateType} from "../App";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./tasks-reducer";
import {CreateTodolistAC, DeleteTodolistAC} from "./todolists-reducer";


test('correct task should be added to correct array', () => {

    const startState: TasksStateType = {
        todolistId1: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ],
    }

    const endState = tasksReducer(startState, AddTaskAC({todolistId: 'todolistId2', title: 'Query'}))

    expect(endState.todolistId1.length).toBe(3)
    expect(endState.todolistId2.length).toBe(3)
    expect(endState.todolistId2[0].title).toBe('Query')
    expect(endState.todolistId2[0].isDone).toBe(false)
    expect(endState.todolistId2[2].isDone).toBeDefined()
})


test('correct task should be deleted from correct array', () => {
    const startState: TasksStateType = {
        todolistId1: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ],
    }

    const endState = tasksReducer(startState, RemoveTaskAC({todolistId: 'todolistId1', taskId: '1'}))

    expect(endState.todolistId1.length).toBe(2)
    expect(endState.todolistId1.length).toBe(2)
    expect(endState).toEqual(
        {
            todolistId1: [
                {id: '2', title: 'JS', isDone: true},
                {id: '3', title: 'ReactJS', isDone: false},
            ],
            todolistId2: [
                {id: '1', title: 'Rest API', isDone: true},
                {id: '2', title: 'GraphQL', isDone: false},
            ],
        })

})


test('correct task status should be changed', () => {
    const startState: TasksStateType = {
        todolistId1: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ],
    }

    const endState = tasksReducer(startState, ChangeTaskStatusAC({
        todolistId: 'todolistId1',
        taskId: '3',
        isDone: true
    }))

    expect(endState.todolistId1[2].isDone).toBe(true)
    expect(endState).toEqual({
        todolistId1: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: true},
        ],
        todolistId2: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ],
    })
})


test('correct task title should be changed', () => {
    const startState: TasksStateType = {
        todolistId1: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ],
    }

    const endState = tasksReducer(startState, ChangeTaskTitleAC({
        todolistId: 'todolistId2',
        taskId: '1',
        title: 'Query'
    }))

    expect(endState.todolistId2[0].title).toBe('Query')
    expect(endState).toEqual({
        todolistId1: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'Query', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ],
    })
})


test('new array should be added when new todolist is added', () => {
    const startState: TasksStateType = {
        todolistId1: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ],
    }

    const endState = tasksReducer(startState, CreateTodolistAC('new todolist'))

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})




test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        todolistId1: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'JS', isDone: true},
            {id: '3', title: 'ReactJS', isDone: false},
        ],
        todolistId2: [
            {id: '1', title: 'Rest API', isDone: true},
            {id: '2', title: 'GraphQL', isDone: false},
        ],
    }

    const endState = tasksReducer(startState, DeleteTodolistAC('todolistId1'))

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId1']).not.toBeDefined()
    // or     expect(endState['todolistId1']).toBeUndefined()
})