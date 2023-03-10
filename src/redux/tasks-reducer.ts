import React from "react";
import { clearTask, clearTasks, createTask, getTasks } from "../api/api";

const initialState = {
    tasks: []
}

const SET_TASKS_DATA = "SET_TASKS_DATA";

const tasksReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_TASKS_DATA:
            return {
                ...state,
                tasks: action.tasks,
            }
        default:
            return state
    }
}

export const setTasksData = (tasks:Task[]) => ({type:SET_TASKS_DATA, tasks})

export const setTasks = () => async(dispatch: any) => {
    let response = await getTasks();
    dispatch(setTasksData(response));
}

export const createNewTask = (task:Task) => async(dispatch: any) => {
    let response = await createTask(task);
    dispatch(setTasksData(response));
}

export const deleteTask = (task:Task) => async(dispatch: any) => {
    let response = await clearTask(task);
    dispatch(setTasksData(response));
}
export const deleteTasks = () => async(dispatch: any) => {
    let response = await clearTasks();
    dispatch(setTasksData(response));
}



interface Action {
    type: string;
    tasks: Task[];
}
interface Task {
    id: number;
    name: string;
    text: string;
    status: boolean;
    upDate: string;
}

export default tasksReducer;