import { Switch } from "antd";
import React from "react";

const GET_PROGRESS = "GET_PROGRESS"; 

let initialState = {
    initialized: true
}

const appReducer = (state=initialState, action:any) => {
    switch(action.type){
        case GET_PROGRESS:
            return {...state, initialized:action.initialized};
        default:
            return state;
    }
}

export const initializedSucces = (initialized:boolean) => ({type:GET_PROGRESS, initialized})

export const initializeApp = () => (dispatch:any) => {
    dispatch(initializedSucces(true))
    let promise;
    
    Promise.all([promise])
        .then(() => {
            setTimeout(()=> dispatch(initializedSucces(false)),1000)
            
        });
};

export default appReducer;