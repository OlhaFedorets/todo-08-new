import {TasksStateType} from "../App";
import {v1} from "uuid";

type AddTaskAT = ReturnType<typeof AddTaskAC>

type ActionsType = AddTaskAT

export const tasksReducer = (tasks: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...tasks, [action.payload.todolistId]: [newTask, ...tasks[action.payload.todolistId]]}

        default:
            return tasks;
    }
}


export const AddTaskAC = (todolistId: string, title: string) => {
    return ({
        type: 'ADD-TASK',
        payload: {
            todolistId,
            title
        }
    } as const)
}