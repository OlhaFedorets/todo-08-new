import {v1} from "uuid";
import {TasksStateType} from "../App";
import {AddTaskAC, tasksReducer} from "./tasks-reducer";


test('correct task should be added to correct array', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksStateType = {
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    }

    const endState = tasksReducer(startState, AddTaskAC(todolistId2, 'Query'))

    expect(endState[todolistId1].length).toBe(3)
    expect(endState[todolistId2].length).toBe(3)
    expect(endState[todolistId2][0].title).toBe('Query')
    expect(endState[todolistId2][0].isDone).toBe(false)
    expect(endState[todolistId2][2].isDone).toBeDefined()
})


// test('correct task should be deleted from correct array', () => {
//     const todolistId1 = v1()
//     const todolistId2 = v1()
//
//     const startState: TasksStateType = {
//         [todolistId1]: [
//             {id: v1(), title: 'HTML&CSS', isDone: true},
//             {id: v1(), title: 'JS', isDone: true},
//             {id: v1(), title: 'ReactJS', isDone: false},
//         ],
//         [todolistId2]: [
//             {id: v1(), title: 'Rest API', isDone: true},
//             {id: v1(), title: 'GraphQL', isDone: false},
//         ],
//     }
//
//     const action = {
//         type: 'REMOVE-TASK',
//         payload: {
//             todolistId: todolistId1,
//             taskId: startState[todolistId1][0].id
//         }
//     }
//     // const action = DeleteTaskAC()
//
//     const endState = tasksReducer(startState, action)
//
//     expect(endState[todolistId1].length).toBe(2)
//     expect(endState[todolistId1].length).toBe(2)
//
// })