import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RooState} from "../store/store";
import {useState} from "react";

export const useAppStateBoolean = (value?: boolean): [boolean, () => void] => {
    const [state, setState] = useState(value || false);
    const toggleState = () => setState(prevState => !prevState)
    return [state, toggleState]
}

export const useAppState = (value: any): [any, (e) => void] => {
    const [state, setState] = useState(value);
    const handleSetState = (e: any) => setState(e.target.value)
    return [state, handleSetState]
}

export const usePrimeReactState = (value: any): [any, (e: { value: any }) => void] => {
    const [state, setState] = useState(value);
    const handleSetState = (e: any) => setState(e.value)
    return [state, handleSetState]
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RooState> = useSelector