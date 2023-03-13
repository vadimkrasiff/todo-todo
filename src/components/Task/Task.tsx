import { Button, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { getTaskData, updateTaskData } from "../../redux/task-reducer";
import Preloader from "../common/Preloader/Preloader";
import css from "./Task.module.css"

const FirstCaseUp = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const { TextArea } = Input;



interface Props {
  task: Task;
  isFetching: boolean;
  getTaskData: (id: number) => void;
  updateTaskData: (task: Task) => void;
}

type Task = {
  id: number;
  name: string;
  text: string;
  status: boolean;
  upDate: string;
}

const onDisable = (value: any, task: any) => {
  let count = 0

  for (let key in task) {
    if (key !== "upDate") {
      task[key] !== value[key] && count++;
      console.log(key)
    }
  }
  return count > 0;
};

const onFinish = (task: Task, values: Task, updateTaskData: (task: Task) => void, id: number) => {
  let time = new Date();
  if (onDisable({ ...values, id: id }, task)) {
    updateTaskData({ ...values, id: id, upDate: new Date().toString() });
    console.log(time.toLocaleString())
    console.log(values.id)
  }
  window.history.back();
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
}

let Task: React.FC<Props> = ({ task, isFetching, getTaskData, updateTaskData }) => {
  let { id } = useParams();

  useEffect(() => {
    getTaskData(Number(id))
  }, [id])

  const [select, onSelect] = useState();

  const onChangeSelect = (e: any) => {
    onSelect(e)
  };

  return <>
    {task?.id !== Number(id) || isFetching ? <div ><Preloader/></div> :
      <>
        <Form
          name="basic"
          className={`${css.form} ${select ? css.active : css.close}`}
          onFinish={(values) => { onFinish(task, values, updateTaskData, task.id,) }}
          initialValues={{ id: task.id, name: task.name, status: task.status, text: task.text, upDate: task.upDate }}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <label>Name</label>
          <Form.Item

            name="name"
            rules={[{ required: true, message: 'Please input name!' },]}
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
              Save
            </Button>
          </Form.Item>
        </Form>
      </>}
  </>
}

const mapStateToProps = (state: State) => ({
  task: state.task.task,
  isFetching: state.task.isFetching
});

type State = {
  task: Tasks;
}

interface Tasks {
  task: Task,
  isFetching: boolean
}



export default compose(connect(mapStateToProps, { getTaskData, updateTaskData }))(Task);