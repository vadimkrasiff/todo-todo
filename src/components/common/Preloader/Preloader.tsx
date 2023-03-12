import { LoadingOutlined, RobotOutlined } from "@ant-design/icons";
import React from "react";
import css from "./Preloader.module.css";

let Preloader: React.FC = () => {
    return <div className={css.preloader}><RobotOutlined className={css.robot} /></div>
}

export default Preloader;