import React from "react";
import { clearTask, clearTasks, createTask, getTasks } from "../api/api";

const initialState = {
    tasks: [],
    isFetching: true,
}
const SET_IS_FETCHING_TASKS = "SET_IS_FETCHING_TASKS";
const SET_TASKS_DATA = "SET_TASKS_DATA";

const tasksReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_TASKS_DATA:
            return {
                ...state,
                tasks: action.tasks,
            }
            case SET_IS_FETCHING_TASKS:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}

export const setTasksData = (tasks:Task[]) => ({type:SET_TASKS_DATA, tasks})
export const setIsFetching = (isFetching: boolean) => ({type: SET_IS_FETCHING_TASKS, isFetching})


export const setTasks = () => async(dispatch: any) => {
    dispatch(setIsFetching(true));
    let response = await getTasks();
    dispatch(setTasksData(response));
    setTimeout(()=> dispatch(setIsFetching(false)), 1000);

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