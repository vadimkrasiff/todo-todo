import React from "react";
import {  getTask, updateTask } from "../api/api";
import { setTasksData } from "./tasks-reducer";

const initialState = {
    task: {},
    isFetching: true,
}

const SET_TASK_DATA = "SET_TASK_DATA";
const SET_IS_FETCHING_TASK = "SET_IS_FETCHING_TASK";

const taskReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_TASK_DATA:
            return {
                ...state,
                task: action.task,
            }
        case SET_IS_FETCHING_TASK:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state
    }
}

export const setTaskData = (task: Task) => ({ type: SET_TASK_DATA, task })
export const setIsFetching = (isFetching: boolean) => ({type: SET_IS_FETCHING_TASK, isFetching})


export const getTaskData = (id: number) => async (dispatch: any) => {
    dispatch(setIsFetching(true));
    let response = await getTask(id);
    dispatch(setTaskData(response));
    setTimeout(()=> dispatch(setIsFetching(false)), 1000);
}

export const updateTaskData = (task: Task) => async (dispatch: any) => {
    dispatch(setIsFetching(true));
    let response = await updateTask(task);
    dispatch(setTaskData(response[task.id]));
    setTimeout(()=> dispatch(setIsFetching(false)), 1000);
}

interface Action {
    type: string;
    task: Task;
}
interface Task {
    id: number;
    name: string;
    text: string;
    status: boolean;
    upDate: string;
}

export default taskReducer;