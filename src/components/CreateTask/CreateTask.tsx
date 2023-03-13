import { getValue } from '@testing-library/user-event/dist/utils';
import { Button, Checkbox, Form, Input, Select } from 'antd';
import { Option } from 'antd/es/mentions';
import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { compose } from 'redux';
import { createNewTask, setTasks } from '../../redux/tasks-reducer';
import Preloader from '../common/Preloader/Preloader';
import css from "./CreateTask.module.css"

const { TextArea } = Input;

const FirstCaseUp = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const onFinish = (values: Task, createNewTask: (task: Task) => void, navigate: any, id: number) => {
    let time = new Date();
    createNewTask({ ...values, id: id, upDate: new Date().toString() });
    console.log(time.toLocaleString())
    navigate('/tasks');
    console.log(values.id)
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};



type Prop = {
    tasks: Task[];
    isFetching: boolean;
    createNewTask: (task: Task) => void;
    setTasks: () => void;
};

let CreateTask: React.FC<Prop> = ({ tasks, isFetching, createNewTask, setTasks }) => {

    const [select, onSelect] = useState(true)

    const onChangeSelect = (e: any) => {
        onSelect(e)
    }

    let navigate = useNavigate();
    useEffect(() => {
        setTasks()
    }, []);
    return <>{isFetching ? <div ><Preloader/></div> :
        <Form
            className={`${css.form} ${select ? css.active : css.close}`}
            name="basic"
            onFinish={(values) => { onFinish(values, createNewTask, navigate, tasks.length); console.log(tasks) }}
            initialValues={{ name: "", status: true, text: "", upDate: "" }}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <label>Name</label>
            <Form.Item
                className={css.item}
                name="name"
                rules={[{ required: true, message: 'Please input name!' }]}
            >
                <Input onInput={e => (e.target as HTMLInputElement).value = FirstCaseUp((e.target as HTMLInputElement).value)} maxLength={15} placeholder="Task name" />
            </Form.Item>
            <label>Status</label>
            <Form.Item name="status" rules={[{ required: true }]}>
                <Select
                    onChange={(value) => onChangeSelect(value)}
                    options={[
                        {
                            value: true,
                            label: 'active',
                        },
                        {
                            value: false,
                            label: 'close',
                        },
                    ]}
                >
                </Select>
            </Form.Item>
            <label>Text</label>
            <Form.Item
                name="text"
                rules={[{ required: true, message: 'Please input text!' }]}
            >
                <TextArea onInput={e => (e.target as HTMLInputElement).value = FirstCaseUp((e.target as HTMLInputElement).value)} autoSize={{ minRows: 15, maxRows: 20 }} placeholder="Task text" />
            </Form.Item>
            <Form.Item >
                <Button className={css.submit} type="primary" htmlType="submit">
                    Add a task
                </Button>
            </Form.Item>
        </Form>}
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
    tasks: Task[],
    isFetching: boolean;
}

interface Task {
    id: number;
    name: string;
    text: string;
    status: boolean;
    upDate: string;
}

export default compose(connect(mapStateToProps, { createNewTask, setTasks }))(CreateTask);