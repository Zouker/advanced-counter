import React from 'react';
import s from './DisplayBlock.module.css';

type PropsType = {
    text: string
    count: number
    isPreview: boolean
    maxValue: number
}

export const DisplayBlock: React.FC<PropsType> = ({
                                                      text,
                                                      count,
                                                      isPreview,
                                                      maxValue
                                                  }) => {

    const scoreboardClassname = count === maxValue ? `${s.counterBoard} ${s.red}` : `${s.counterBoard}`

    const displayTextClassName = text === `Incorrect value!` ? `${s.counterBoard} ${s.textError}` : `${s.counterBoard} ${s.text}`
    return (
        <>
            {isPreview
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
