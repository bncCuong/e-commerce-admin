import React, { ButtonHTMLAttributes } from 'react';

type Props = {
    type: 'submit' | 'reset' | 'button' | undefined;
    children: React.ReactNode;
    onClick?: () => void;
};

export const Button = ({ type, children, onClick }: Props) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={` relative min-w-[86px] inline-flex items-center justify-center px-5 py-1.5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500`}
        >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
            <span className="relative text-white">{children}</span>
        </button>
    );
};
