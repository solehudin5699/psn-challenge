import clsx from 'clsx';
import React from 'react';

interface Props {
    children: React.ReactNode;
    className?: string;
    id?: string;
    required?: boolean;
    requiredPosition?: 'left' | 'right';
    style?: React.CSSProperties;
}
function Label(props: Props) {
    const { required, children, id, style, className, requiredPosition } = props;
    return (
        <label
            className={clsx('text-baseBlack font-semibold text-base whitespace-nowrap', className)}
            htmlFor={id}
            style={style}
        >
            {required && requiredPosition === 'left' ? <span className="text-[#E42312]">*</span> : ''}
            {children}
            {required && requiredPosition === 'right' ? <span className="text-[#E42312]">*</span> : ''}
        </label>
    );
}

Label.defaultProps = {
    className: '',
    requiredPosition: 'left',
    id: undefined,
    required: false,
    style: undefined,
};
export default Label;
