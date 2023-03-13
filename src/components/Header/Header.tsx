import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import React, { useState, useRef, useEffect } from "react";
import { useOnClickOutside } from 'usehooks-ts'
import css from "./Header.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { PlusOutlined, RollbackOutlined, FieldTimeOutlined } from "@ant-design/icons"
import { Button, Modal } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import {deleteTasks, setTasks} from "./../../redux/tasks-reducer"
import {initializeApp} from "./../../redux/app-reducer"
import { Switch } from 'antd';
import { ThemeContext, themes  } from "../../contexts/ThemeContext";
import Themes from "./Themes/Themes";


type Task = {
    id: number;
    name: string;
    text: string;
    status: boolean;
    upDate: string;
  }

interface Props {
    tasks: Task[];
    deleteTasks: ()=>void;
    setTasks:() => void;
}

const onChange = (theme:any, setTheme:any) => {
    if (theme === themes.light) setTheme(themes.dark)
          if (theme === themes.dark) setTheme(themes.light)
  };

let Header : React.FC<Props> = ({tasks, deleteTasks, setTasks}) => {
    
    useEffect(()=>{setTasks()}, [])

    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        deleteTasks();
        closeMenu();
        setTasks();
        navigate("/tasks");
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        closeMenu();
    };

    const [open, setOpen] = useState(false);

    const ref = useRef(null);

    const onMenu = () => {
        setOpen(!open);
    }

    const closeMenu = () => {
        setOpen(false);
    };

    useOnClickOutside(ref, closeMenu);

    window.addEventListener('resize', closeMenu);

    return <header>
        <div className={css.content}>
            <NavLink to="/tasks"><div className={css.logo}>TODO-TODO</div></NavLink>
            <div ref={ref} className={`${open ? `${css.menu} ${css.openMenu}` : css.menu} `}>
                <NavLink  to="/createtask" onClick={closeMenu}><PlusOutlined className={css.icon} />Create task</NavLink>
                <NavLink to="/activetasks" onClick={closeMenu}> <FieldTimeOutlined className={css.icon} />Active task</NavLink>
                <NavLink to="/lasttasks" onClick={closeMenu}><RollbackOutlined className={css.icon} />last task</NavLink>
                <div className={css.clrBut} onClick={showModal}><CloseOutlined className={css.icon} />Clear tasks</div>
                <div  ref={ref}><Themes /></div>
                <div className={css.lastMenu}></div>
            </div>
            <div className={css.butMenu} ><MenuOutlined />
                <div  onClick={onMenu} className={!open ? css.trigger : ""}></div>
            </div>
        </div>
        <Modal
        centered
        width={300}
        bodyStyle={{height:10}}
        title={tasks.length > 0 ? "Do you want to delete all the tasks?": "You have no tasks"}
            footer={tasks.length > 0 ?[
                <Button key="back" onClick={handleCancel}>No</Button>,
                <Button key="submit" type="primary" onClick={handleOk}>Yes</Button>,
            ]:<Button key="back" type="primary" onClick={handleCancel}>Ok</Button>}
            open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        </Modal>
    </header>
}

let mapStateToProps = (state:any) => ({
    tasks: state.tasks.tasks
})
export default  compose(connect(mapStateToProps,{deleteTasks, setTasks, initializeApp}))(Header);