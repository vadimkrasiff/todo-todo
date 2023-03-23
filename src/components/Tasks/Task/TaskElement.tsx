import React from "react";
import css from "./Task.module.css"
import { CloseOutlined, PlusOutlined } from "@ant-design/icons"
import { NavLink } from "react-router-dom";

interface Props {
  task: Task;
  deleteTask: (task: Task) => void;
}
interface Task {
  id: number;
  name: string;
  text: string;
  status: boolean;
  upDate: string;
}

let TaskElement: React.FC<Props> = ({ task, deleteTask }) => {

  let text = task.text;

  let upDate = new Date(task.upDate);
  let date = Date.parse(task.upDate) / 86400000;
  let time = Date.parse((new Date()).toLocaleString()) / 86400000;
  
  return <div > <NavLink to={'/task/' + task.id} className={`${css.task} ${task.status ? css.active : css.close}`}>
    <div className={css.info}>
      <div className={css.label}>{task.name}</div>
      <div className={css.text}>{text.length > 22 ? text = text.slice(0, 22) + "..." : text}</div>
      <div className={css.upDate}>{new Date().getDate() === upDate.getDate() ?
        <span>today at {upDate.toLocaleTimeString()}</span> :
        Math.round(time - date) <= 1 ?
          <span>yesterday at {upDate.toLocaleTimeString()}</span> :
          upDate.toLocaleDateString()}</div>
      <div className={task.status ? css.active : css.close}></div>
      <div className={!task.status ? css.closed: css.noClosed}>CLOSED</div>
    </div>
    <div className={css.cats}></div>
    <NavLink to='/tasks'><CloseOutlined className={css.delete} onClick={() => deleteTask(task)} /></NavLink>
  </NavLink>
  </div>
}

export default TaskElement;