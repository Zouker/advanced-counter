import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Counter.module.css'
import {Button} from './components/Button';

export type TextType = `enter values and press 'set'` | `Incorrect value!`

export const Counter = () => {
    const [startValue, setStartValue] = useState<number>(0)
    const [maxValue, setMaxValue] = useState<number>(5)
    const [count, setCount] = useState<number>(startValue)
    const [startValueError, setStartValueError] = useState(false)
    const [maxValueError, setMaxValueError] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [disabledInc, setDisabledInc] = useState(true)
    const [disabledReset, setDisabledReset] = useState(true)
    const [text, setText] = useState<TextType>(`enter values and press 'set'`)
    const [isPreview, setIsPreview] = useState(true)
    useEffect(() => {
        let valueStartValueAsString = localStorage.getItem('startValue')
        if (valueStartValueAsString) {
            let newValue = JSON.parse(valueStartValueAsString)
            setStartValue(newValue)
        }
        let valueMaxValueAsString = localStorage.getItem('maxValue')
        if (valueMaxValueAsString) {
            let newValue = JSON.parse(valueMaxValueAsString)
            setMaxValue(newValue)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('startValue', JSON.stringify(startValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
    })

    const setHandler = () => {
        localStorage.setItem('startValue', JSON.stringify(startValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
        setCount(startValue)
        setIsPreview(false)
        setDisabled(true)
        setDisabledInc(false)
        setDisabledReset(false)
    }

    const incHandler = () => {
        if (count < maxValue) {
            setCount(state => state + 1)
        }
    }
    const resetHandler = () => {
        setCount(startValue)
        setDisabled(false)
        setIsPreview(true)
        setDisabledInc(true)
    }

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
            console.log('isIncorrectValue')
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

    const incDisabled = disabledInc || count === maxValue
    const resetDisabled = disabledReset || count === startValue

    const scoreboardClassname = count === maxValue ? `${s.counterBoard} ${s.red}` : `${s.counterBoard}`

    const displayTextClassName = text === `Incorrect value!` ? `${s.counterBoard} ${s.textError}` : `${s.counterBoard} ${s.text}`

    const startValueActive = startValueError ? s.errorInput : s.defaultInput
    const maxValueActive = maxValueError ? s.errorInput : s.defaultInput

    const isViewText = isPreview || startValue < 0 || maxValue < 0
    console.log('startValue', startValue)
    console.log('maxValue', maxValue)


    return (
        <div className={s.wrapper}>
            <div className={s.counter}>
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
                <div className={s.buttonsBlock}>
                    <div>
                        <Button title={'set'}
                                callback={setHandler}
                                className={s.button}
                                disabled={disabled}
                        />
                    </div>
                </div>
            </div>
            <div className={s.counter}>
                {isViewText
                    ?
                    <div className={displayTextClassName}>
                        {text}
                    </div>
                    : <div className={scoreboardClassname}>
                        {count}
                    </div>}

                <div className={s.buttonsBlock}>
                    <div>
                        <Button callback={incHandler}
                                className={s.button}
                                disabled={incDisabled}
                                title={'inc'}
                        />
                    </div>
                    <div>
                        <Button title={'reset'}
                                disabled={resetDisabled}
                                className={s.button}
                                callback={resetHandler}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

