import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './Counter.module.css'

export type TextType = `enter values and press 'set'` | `Incorrect value!`

export const Counter = () => {
    const [startValue, setStartValue] = useState(0)
    const [maxValue, setMaxValue] = useState(5)
    const [count, setCount] = useState<number | null>(null)
    const [error, setError] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [text, setText] = useState<TextType>(`enter values and press 'set'`)


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
    }, [startValue])

    useEffect(() => {
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
    }, [maxValue])

    const setHandler = () => {
        if (maxValue <= startValue) {
            setError(true)
            setDisabled(true)
            setText(`Incorrect value!`)
        } else {
            setError(false)
            setDisabled(false)
            setCount(startValue)
        }
        localStorage.setItem('startValue', JSON.stringify(startValue))
        localStorage.setItem('maxValue', JSON.stringify(maxValue))
        setCount(startValue)
    }

    const incHandler = () => {
        if (count && count < maxValue) {
            setCount(state => state && state + 1)
        }
    }

    const resetHandler = () => {
        setCount(startValue)
    }

    const onChangeMaxValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (maxValue <= startValue) {
            setError(true)
            // setDisabled(true)
            setMaxValue(JSON.parse(e.currentTarget.value))
        } else {
            setError(false)
            // setDisabled(false)
            setMaxValue(JSON.parse(e.currentTarget.value))
        }
    }

    const onChangeStartValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setStartValue(JSON.parse(e.currentTarget.value))
    }

    const incDisabled = count === maxValue || count === null
    const resetDisabled = count === startValue || count === null

    const scoreboardClassname = count === maxValue ? `${s.counterBoard} ${s.red}` : `${s.counterBoard}` && count === null ? `${s.counterBoard} ${s.textSize}` : `${s.counterBoard}`

    return (
        <div className={s.wrapper}>
            <div className={s.counter}>
                <div className={s.settingsBlock}>
                    <div className={s.settingsBlockInput}>
                        <span>max value:</span>
                        <input onChange={onChangeMaxValueHandler}
                               type={'number'}
                               value={maxValue}
                        />
                    </div>
                    <div className={s.settingsBlockInput}>
                        <span>start value:</span>
                        <input onChange={onChangeStartValueHandler}
                               type={'number'}
                               value={startValue}
                        />
                    </div>
                </div>
                <div className={s.buttonsBlock}>
                    <div>
                        <button className={s.button}
                                onClick={setHandler}
                                disabled={disabled}
                        >set
                        </button>
                    </div>
                </div>
            </div>
            <div className={s.counter}>
                <div className={scoreboardClassname}>
                    {count === null ? text : count}
                </div>
                <div className={s.buttonsBlock}>
                    <div>
                        <button disabled={incDisabled} className={s.button} onClick={incHandler}>inc</button>
                    </div>
                    <div>
                        <button disabled={resetDisabled} className={s.button} onClick={resetHandler}>reset
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

