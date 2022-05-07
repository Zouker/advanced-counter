import React from 'react';
import s from './Counter.module.css'
import {Button} from './components/Button';
import {SettingsBlock} from './components/SettingsBlock';
import {DisplayBlock} from './components/DisplayBlock';
import {useDispatch, useSelector} from 'react-redux';
import {AppStateType} from './bll/store';
import {CounterStateType, isPreviewAC, setCountValueAC} from './bll/counter-reducer';

export const Counter = () => {
    const {startValue, maxValue, count, isPreview} = useSelector<AppStateType, CounterStateType>(state => state.counter)
    const dispatch = useDispatch()

    const setHandler = () => {
        dispatch(setCountValueAC(startValue))
        dispatch(isPreviewAC(false))
    }
    const incHandler = () => {
        dispatch(setCountValueAC(count + 1))
    }
    const resetHandler = () => {
        dispatch(setCountValueAC(startValue))
    }

    return (
        <div className={s.wrapper}>
            <div className={s.counter}>
                <SettingsBlock/>
                <div className={s.buttonsBlock}>
                    <div>
                        <Button title={'set'}
                                callback={setHandler}
                                className={s.button}
                                disabled={startValue >= maxValue || startValue < 0 || !isPreview}
                        />
                    </div>
                </div>
            </div>
            <div className={s.counter}>
                <DisplayBlock/>
                <div className={s.buttonsBlock}>
                    <div>
                        <Button callback={incHandler}
                                className={s.button}
                                disabled={count === maxValue || isPreview}
                                title={'inc'}
                        />
                    </div>
                    <div>
                        <Button title={'reset'}
                                disabled={count === startValue || isPreview}
                                className={s.button}
                                callback={resetHandler}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

