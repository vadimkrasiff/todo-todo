import React from "react";
import { compose } from "redux";
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { deleteTask, setTasks } from "../../redux/tasks-reducer";
import css from "./Tasks.module.css";
import CreateTaskElement from "./Task/CreateTaskElement";
import TaskElement from "./Task/TaskElement";
import Preloader from "../common/Preloader/Preloader";

interface Props {
  tasks: Task[];
  isFetching: boolean;
  setTasks: () => void;
  deleteTask: (task:Task) => void;
};

let Tasks: React.FC<Props> = ({ tasks, isFetching, setTasks,  deleteTask}) => {

  
  useEffect(() => {
    setTasks();
  }, []);

  return <>
    {isFetching ? <div ><Preloader/></div> : tasks.length == 0 ?  <div className={css.tasks}>
      <CreateTaskElement />
    </div> : <div className={css.tasks}>
    <CreateTaskElement />
      {tasks.map((el, index) => (<TaskElement key={index} task={el} deleteTask={deleteTask} />))}
    </div>}
  </>
}

const mapStateToProps = (state: State) => ({
  tasks: state.tasks.tasks,
  isFetching: state.tasks.isFetching
});

type State = {
  tasks: Tasks;
}

interface Tasks {
  tasks: Task[];
  isFetching: boolean;
}

interface Task {
  id: number;
  name: string;
  text: string;
  status: boolean;
  upDate: string;
}


export default compose(connect(mapStateToProps, { setTasks, deleteTask }))(Tasks);