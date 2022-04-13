import React from 'react';
import s from './DisplayBlock.module.css';

type PropsType = {
    text: string
    count: number
    isPreview: boolean
    startValue: number
    maxValue: number
}

export const DisplayBlock: React.FC<PropsType> = ({
                                                      text,
                                                      count,
                                                      isPreview,
                                                      startValue,
                                                      maxValue
                                                  }) => {
    const isViewText = isPreview || startValue < 0 || maxValue < 0
    const scoreboardClassname = count === maxValue ? `${s.counterBoard} ${s.red}` : `${s.counterBoard}`

    const displayTextClassName = text === `Incorrect value!` ? `${s.counterBoard} ${s.textError}` : `${s.counterBoard} ${s.text}`
    return (
        <>
            {isViewText
                ?
                <div className={displayTextClassName}>
                    {text}
                </div>
                : <div className={scoreboardClassname}>
                    {count}
                </div>}
        </>
    );
};
