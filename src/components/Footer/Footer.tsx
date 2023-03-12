import React from "react";
import {GithubOutlined} from "@ant-design/icons"
import css from "./Footer.module.css"

let Footer = () => {
    return <div className={css.footer}>
        <div>by vadimkrasiff</div>
        <a href="https://github.com/vadimkrasiff"><div><GithubOutlined  /></div>GitHub</a>
        <a href="https://vk.com/zachem_tobi_ito"><div className={css.vk}></div>VK</a>
        <a href="https://t.me/zachem_tobi_ito"><div className={css.tg}></div>Telegram</a>
    </div>
}

export default Footer;