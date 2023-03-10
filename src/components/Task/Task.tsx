import { Button, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { getTaskData, updateTaskData } from "../../redux/task-reducer";
import css from "./Task.module.css"

const FirstCaseUp = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const { TextArea } = Input;

interface Props {
    task: Task;
    getTaskData: (id:number) => void;
    updateTaskData: (task: Task) => void;
}

  type Task = {
    id: number;
    name: string;
    text: string;
    status: boolean;
    upDate: string;
  }

  const onDisable = (value:any, task:any) => {
    let count= 0
    
    for(let key in task) {
      if(key !== "upDate"){
      task[key] !== value[key] && count++;
      console.log(key)}
    }
    
    return count > 0;
  }
  
const onFinish = (task: Task,values: Task, updateTaskData: (task:Task) => void, id: number) => {
  let time = new Date();
  if(onDisable({...values, id: id}, task)){
  updateTaskData({...values, id: id, upDate: new Date().toString()});
  console.log(time.toLocaleString())
  console.log(values.id)}
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
}

let Task : React.FC<Props>  = ({task, getTaskData, updateTaskData}) => {
 let {id} = useParams();

    useEffect(()=> {
        getTaskData(Number(id))
    },[id])


    return <>
        {task?.id !== Number(id) ? <div >None </div> :
       <div className={css.task}>
       <Form
           name="basic"
           className={css.form}
           labelCol={{ span: 3 }}
           wrapperCol={{ span: 16 }}
           onFinish={(values)=>{onFinish(task, values, updateTaskData, task.id,)}}
           initialValues={{id: task.id, name:task.name, status:task.status, text:task.text, upDate:task.upDate}}
           onFinishFailed={onFinishFailed}
           autoComplete="off"
       >
           <Form.Item
               label="Name"
               name="name"
               rules={[{ required: true, message: 'Please input name!' }, ]}
           >
               <Input onInput={e => (e.target as HTMLInputElement).value = FirstCaseUp((e.target as HTMLInputElement).value) } maxLength={15} placeholder="Task name" />
           </Form.Item>
           <Form.Item name="status" label="Status" rules={[{ required: true }]}>
               <Select
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
           <Form.Item
               label="Text"
               name="text"
               rules={[{ required: true, message: 'Please input text!' }]}
           >
               <TextArea  onInput={e => (e.target as HTMLInputElement).value = FirstCaseUp((e.target as HTMLInputElement).value) } autoSize={{ minRows: 10, maxRows: 10 }} placeholder="Task text" />
           </Form.Item>
           <Form.Item >
               <Button className={css.submit}  type="primary" htmlType="submit">
                   Save
               </Button>
           </Form.Item>
       </Form>
   </div>}
    </>
}

const mapStateToProps = (state: State) => ({
    task: state.task.task
  });

  type State = {
    task:Tasks;
  }

  interface Tasks {
    task: Task
  }
  

  
export default compose(connect(mapStateToProps,{getTaskData, updateTaskData}))(Task);