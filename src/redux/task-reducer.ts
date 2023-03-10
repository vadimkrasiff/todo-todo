import React from "react";
import {  getTask, updateTask } from "../api/api";
import { setTasksData } from "./tasks-reducer";

const initialState = {
    task: {}
}

const SET_TASK_DATA = "SET_TASK_DATA";

const taskReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_TASK_DATA:
            return {
                ...state,
                task: action.task,
            }
        default:
            return state
    }
}

export const setTaskData = (task: Task) => ({ type: SET_TASK_DATA, task })


export const getTaskData = (id: number) => async (dispatch: any) => {
    let response = await getTask(id);
    dispatch(setTaskData(response));
}

export const updateTaskData = (task: Task) => async (dispatch: any) => {
    let response = await updateTask(task);
    dispatch(setTaskData(response[task.id]));
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