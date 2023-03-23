import { RadarChartOutlined } from "@ant-design/icons";
import React from "react";
import css from "./Preloader.module.css";

let Preloader: React.FC = () => {
    return <div className={css.preloader}><RadarChartOutlined className={css.robot} /><div className={css.cat}></div></div>
}

export default Preloader;