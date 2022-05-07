import React from 'react';
import s from './DisplayBlock.module.css';
import {useSelector} from 'react-redux';
import {AppStateType} from '../bll/store';
import {CounterStateType} from '../bll/counter-reducer';

export const DisplayBlock = () => {
    const {count, startValue, maxValue, isPreview} = useSelector<AppStateType, CounterStateType>(state => state.counter)

    const scoreboardClassname = count === maxValue ? `${s.counterBoard} ${s.red}` : `${s.counterBoard}`

    return (
        <>
            {isPreview
                ?
                <div
                    className={startValue < 0 || maxValue < 0 || startValue === maxValue || startValue > maxValue
                        ? `${s.counterBoard} ${s.textError}`
                        : `${s.counterBoard} ${s.text}`}>
                    {startValue < 0 || maxValue < 0 || startValue === maxValue || startValue > maxValue
                        ? `Incorrect value!`
                        : `enter values and press 'set'`}
                </div>
                : <div className={scoreboardClassname}>
                    {count}
                </div>}
        </>
    );
};
