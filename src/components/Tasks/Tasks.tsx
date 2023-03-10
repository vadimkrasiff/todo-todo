import React from "react";
import { compose } from "redux";
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { deleteTask, setTasks } from "../../redux/tasks-reducer";
import css from "./Tasks.module.css";
import CreateTaskElement from "./Task/CreateTaskElement";
import TaskElement from "./Task/TaskElement";

interface Props {
  tasks: Task[];
  setTasks: () => void;
  deleteTask: (task:Task) => void;
};

let Tasks: React.FC<Props> = ({ tasks, setTasks,  deleteTask}) => {

  
  useEffect(() => {
    setTasks();
  }, []);

  return <>
    {tasks.length == 0 ? <div className={css.tasks}>
      <CreateTaskElement />
    </div> : <div className={css.tasks}>
    <CreateTaskElement />
      {tasks.map((el, index) => (<TaskElement key={index} task={el} deleteTask={deleteTask} />))}
    </div>}
  </>
}

const mapStateToProps = (state: State) => ({
  tasks: state.tasks.tasks
});

type State = {
  tasks: Tasks;
}

interface Tasks {
  tasks: Task[]
}

interface Task {
  id: number;
  name: string;
  text: string;
  status: boolean;
  upDate: string;
}


export default compose(connect(mapStateToProps, { setTasks, deleteTask }))(Tasks);