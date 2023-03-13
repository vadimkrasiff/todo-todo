import { RadarChartOutlined } from "@ant-design/icons";
import React from "react";
import css from "./Preloader.module.css";

let Preloader: React.FC = () => {
    return <div className={css.preloader}><RadarChartOutlined className={css.robot} /></div>
}

export default Preloader;