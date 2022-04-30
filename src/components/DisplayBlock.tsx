import React from 'react';
import s from './DisplayBlock.module.css';
import {useSelector} from 'react-redux';
import {CounterStateType} from '../bll/counter-reducer';
import {AppStateType} from '../bll/store';

type PropsType = {
    text: string
    count: number
    maxValue: number
}

export const DisplayBlock: React.FC<PropsType> = ({
                                                      text,
                                                      count,
                                                      maxValue,
                                                  }) => {
    const data = useSelector<AppStateType, CounterStateType>(state => state.counter)

    const scoreboardClassname = count === maxValue ? `${s.counterBoard} ${s.red}` : `${s.counterBoard}`

    const displayTextClassName = text === `Incorrect value!` ? `${s.counterBoard} ${s.textError}` : `${s.counterBoard} ${s.text}`
    return (
        <>
            {data.isPreview
                ?
                <div
                    className={displayTextClassName}>
                    {text}
                </div>
                : <div className={scoreboardClassname}>
                    {count}
                </div>}
        </>
    );
};
