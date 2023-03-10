import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import React, { useState, useRef } from "react";
import { useOnClickOutside } from 'usehooks-ts'
import css from "./Header.module.css";
import { NavLink } from "react-router-dom";
import { PlusOutlined, RollbackOutlined, FieldTimeOutlined } from "@ant-design/icons"
import { Button, Modal } from "antd";
import { connect } from "react-redux";
import { compose } from "redux";
import {deleteTasks} from "./../../redux/tasks-reducer"

interface Props {
    deleteTasks: ()=>void; 
}

let Header : React.FC<Props> = ({deleteTasks}) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        deleteTasks();
        closeMenu();
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
        title="Do you want to delete all the tasks?"
            footer={[
                <Button key="back" onClick={handleCancel}>No</Button>,
                <Button key="submit" type="primary" onClick={handleOk}>Yes</Button>,
            ]}
            open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        </Modal>
    </header>
}


export default  compose(connect(null,{deleteTasks}))(Header);