import React from "react";
import css from "./Task.module.css"
import {PlusOutlined} from "@ant-design/icons"
import { NavLink } from "react-router-dom";

let CreateTaskElement = () => {
    return <NavLink to='/createtask' className={css.task}>
        <div className={css.icon}><PlusOutlined /></div>
        <div >Create task</div>
    </NavLink>
}

export default CreateTaskElement;