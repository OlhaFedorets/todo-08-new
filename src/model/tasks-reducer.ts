import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {CreateTodolistAT} from "./todolists-reducer";

type AddTaskAT = ReturnType<typeof AddTaskAC>
type RemoveTaskAT = ReturnType<typeof RemoveTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof ChangeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof ChangeTaskTitleAC>

type ActionsType = AddTaskAT | RemoveTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | CreateTodolistAT


export const tasksReducer = (tasks: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            const {title, todolistId} = action.payload
            const newTask: TaskType = {
                id: v1(),
                title: title,
                isDone: false
            }
            return {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        }
        case 'REMOVE-TASK': {
            const {todolistId, taskId} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId)}
        }
        case 'CHANGE-TASK-STATUS': {
            const {todolistId, taskId, isDone} = action.payload
            return {
                ...tasks,
                [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone} : task)
            }
        }

        case 'CHANGE-TASK-TITLE': {
            const {todolistId, taskId, title} = action.payload
            return {...tasks, [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, title} : task)}
        }

        case 'CREATE_TODOLIST': {
            const {id} = action.payload
            return {...tasks, [id]: []}
        }
        default:
            return tasks;
    }
}


export const AddTaskAC = (payload: { todolistId: string, title: string }) => {
    return ({
        type: 'ADD-TASK',
        payload       //сокращенно от payload: payload
    } as const)
}

export const RemoveTaskAC = (payload: { todolistId: string, taskId: string }) => {
    return ({
        type: 'REMOVE-TASK',
        payload
    } as const)
}

export const ChangeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
    return ({
        type: 'CHANGE-TASK-STATUS',
        payload
    } as const)
}

export const ChangeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => {
    return ({
        type: 'CHANGE-TASK-TITLE',
        payload
    } as const)
}