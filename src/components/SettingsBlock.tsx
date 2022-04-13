import React, {ChangeEvent, useState} from 'react';
import s from './SettingsBlock.module.css';
import {TextType} from '../Counter';

type PropsType = {
    startValue: number
    maxValue: number
    disabled: boolean
    setDisabled: (disabled: boolean) => void
    setDisabledInc: (disabledInc: boolean) => void
    setDisabledReset: (disabledReset: boolean) => void
    setText: (text: TextType) => void
    setStartValue: (startValue: number) => void
    setMaxValue: (maxValue: number) => void
}

export const SettingsBlock: React.FC<PropsType> = ({
                                                       startValue,
                                                       maxValue,
                                                       setDisabled,
                                                       setDisabledReset,
                                                       setText,
                                                       setStartValue,
                                                       setMaxValue
                                                   }) => {
    const [startValueError, setStartValueError] = useState(false)
    const [maxValueError, setMaxValueError] = useState(false)

    const startValueActive = startValueError ? s.errorInput : s.defaultInput
    const maxValueActive = maxValueError ? s.errorInput : s.defaultInput

    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const isIncorrectValue = startValue === +e.currentTarget.value || +e.currentTarget.value < 0 || startValue > +e.currentTarget.value
        if (isIncorrectValue) {

            setStartValueError(true)
            setMaxValueError(true)
            setText('Incorrect value!')
            setDisabled(true)
        } else if (+e.currentTarget.value >= 0 && startValue >= 0) {

            setStartValueError(false)
            setMaxValueError(false)
            setText(`enter values and press 'set'`)
            setDisabled(false)
        } else if (startValue < 0) {

            setStartValueError(true)
            setMaxValueError(false)
            setDisabled(true)
        }
        setDisabledReset(true)
        setMaxValue(+e.currentTarget.value)
    }

    const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const isIncorrectValue = +e.currentTarget.value === maxValue || maxValue < 0 || +e.currentTarget.value > maxValue
        if (isIncorrectValue) {
            setStartValueError(true)
            setMaxValueError(true)  ///!
            setText('Incorrect value!')
            setDisabled(true)
        } else if (+e.currentTarget.value >= 0 && maxValue >= 0) {
            setStartValueError(false)
            setMaxValueError(false) ////!
            setText(`enter values and press 'set'`)
            setDisabled(false)
        } else if (+e.currentTarget.value < 0) {
            setStartValueError(true)
            setMaxValueError(false)
            setDisabled(true)
        }
        setDisabledReset(true)
        setStartValue(+e.currentTarget.value)
    }

    return (
        <div className={s.settingsBlock}>
            <div className={s.settingsBlockInput}>
                <span>max value:</span>
                <input className={maxValueActive} onChange={onChangeMaxValueHandler}
                       type={'number'}
                       value={maxValue}
                />
            </div>
            <div className={s.settingsBlockInput}>
                <span>start value:</span>
                <input className={startValueActive} onChange={onChangeStartValueHandler}
                       type={'number'}
                       value={startValue}
                />
            </div>
        </div>
    );
};
