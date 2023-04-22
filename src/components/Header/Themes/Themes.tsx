import { Select } from "antd";
import React, { useContext } from "react";
import { ThemeContext, themes } from "../../../contexts/ThemeContext";
import css from "./../Header.module.css";

interface Props {
}

let Themes: React.FC<Props> = () => {
    const onChange = (theme: any, setTheme: any) => {
        setTheme({ theme })
    };

    return <ThemeContext.Consumer>
        {({ theme, setTheme }: any) => {
            return <>
                <Select className={css.select} bordered={false} defaultValue={theme} onChange={(v) => onChange(v, setTheme)} options={[
                    {
                        value: 'light',
                        label: 'Light theme',
                    },
                    {
                        value: 'dark',
                        label: 'Dark theme',
                    },
                    {
                        value: 'funny',
                        label: 'Funny theme',
                    }
                ]} />
            </>
        }}
    </ThemeContext.Consumer>
}

export default Themes;