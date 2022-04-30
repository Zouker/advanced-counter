import React, {ChangeEvent} from 'react';
import s from './SettingsBlock.module.css';
import {useDispatch} from 'react-redux';
import {isPreviewAC, setMaxValueAC, setStartValueAC} from '../bll/counter-reducer';

type PropsType = {
    startValue: number
    maxValue: number
}

export const SettingsBlock: React.FC<PropsType> = ({
                                                       startValue,
                                                       maxValue,
                                                   }) => {
    const dispatch = useDispatch()

    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(isPreviewAC(true))
        dispatch(setMaxValueAC(+e.currentTarget.value))
    }
    const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(isPreviewAC(true))
        dispatch(setStartValueAC(+e.currentTarget.value))
    }

    return (
        <div className={s.settingsBlock}>
            <div className={s.settingsBlockInput}>
                <span>max value:</span>
                <input className={(startValue >= maxValue) || maxValue < 0 ? s.errorInput : s.defaultInput}
                       onChange={onChangeMaxValueHandler}
                       type={'number'}
                       value={maxValue}
                />
            </div>
            <div className={s.settingsBlockInput}>
                <span>start value:</span>
                <input
                    className={(startValue >= maxValue) || startValue < 0 || maxValue < 0 ? s.errorInput : s.defaultInput}
                    onChange={onChangeStartValueHandler}
                    type={'number'}
                    value={startValue}
                />
            </div>
        </div>
    );
};
