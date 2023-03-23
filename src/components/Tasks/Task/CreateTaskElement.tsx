import React from "react";
import css from "./Task.module.css"
import {PlusOutlined} from "@ant-design/icons"
import { NavLink } from "react-router-dom";

let CreateTaskElement = () => {
    return <NavLink to='/createtask' id={css.createTask} className={css.task}>
        <div className={css.icon}><PlusOutlined /></div>
        <div className={css.title}>Create task</div>
        <div className={css.cat}></div>
    </NavLink>
}

export default CreateTaskElement;