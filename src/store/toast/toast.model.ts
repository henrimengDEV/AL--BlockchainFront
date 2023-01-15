import * as React from "react";
import {ToastSeverityType} from "primereact/toast";

export interface ToastMessage {
    severity?: ToastSeverityType;
    summary?: React.ReactNode;
    detail?: React.ReactNode;
    content?: React.ReactNode;
    closable?: boolean;
    sticky?: boolean;
    life?: number;
    className?: string;
    style?: React.CSSProperties;
    contentClassName?: string;
    contentStyle?: React.CSSProperties;
    transactionHash?: string
}