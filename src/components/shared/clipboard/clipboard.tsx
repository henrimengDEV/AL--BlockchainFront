import "./clipboard.css"
import React from "react";
import {Tooltip} from "primereact/tooltip";
import {copyInClipboard} from "../file-utils";

const Clipboard = (props: { icon?: string, text: string }) => {
    return (
        <>
            <Tooltip target=".disabled-button" />
            <span className="clipboard__span disabled-button" data-pr-tooltip="Copy">
                <p className="clipboard" onClick={() => copyInClipboard(props.text)}>
                    {props.icon ? <i className={props.icon} /> : ''}
                    {props.text}
                </p>
            </span>
        </>
    )
}

export default Clipboard