import { ChangeEventHandler } from 'react';

type Props = {
    placeholder: string;
    label: string;
    type: string;
    isError: any;
    require?: boolean;
    registee: any;
    name: string;
    exitingValue?: string | number;
};

export const Input = ({ placeholder, label, type, isError, require, registee, name, exitingValue }: Props) => {
    return (
        <div className="mb-6 relative">
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input
                defaultValue={exitingValue}
                {...registee(name, { required: require, minLength: 2 })}
                type={type}
                aria-describedby="helper-text-explanation"
                className={`${
                    isError ? 'border-red-600' : ''
                } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-[300px] p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                placeholder={placeholder}
            />
            {isError && <p className="absolute text-xs mt-0 text-red-600">Please enter a {placeholder} </p>}
        </div>
    );
};
