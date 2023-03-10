import React from "react";
import {GithubOutlined} from "@ant-design/icons"
import css from "./Footer.module.css"

let Footer = () => {
    return <div className={css.footer}>
        <div>by vadimkrasiff</div>
        <a><div><GithubOutlined  /></div>GitHub</a>
        <a><div className={css.vk}></div>VK</a>
        <a><div className={css.tg}></div>Telegram</a>
    </div>
}

export default Footer;