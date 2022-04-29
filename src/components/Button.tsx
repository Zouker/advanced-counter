import React from 'react';

type PropsType = {
    title: string
    callback: () => void
    className: string
    disabled?: boolean
}

export const Button: React.FC<PropsType> = ({title, callback, className, ...props}) => {
    return (
        <button onClick={callback} className={className} disabled={props.disabled}>{title}</button>
    );
};

