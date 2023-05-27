import { useState } from 'react';

type Props = {
    placeholder: string;
    label: string;
    type: string;
    isError?: any;
    require?: boolean;
    registee: any;
    name?: string;
    exitingValue?: string | number;
    onChange?: () => void;
};

export const Input = ({ placeholder, label, type, isError, require, registee, name, exitingValue }: Props) => {
    return (
        <div className="mb-6 relative">
            <label className="block mb-1 text-sm font-medium text-gray-900 ">{label}</label>
            <input
                defaultValue={exitingValue}
                {...registee(name, { required: require, minLength: 2 })}
                type={type}
                className={`${isError ? 'border-red-600' : ''} input`}
                placeholder={placeholder}
            />
            {isError && <p className="absolute text-xs mt-0 text-red-600">Please enter a {placeholder} </p>}
        </div>
    );
};
