
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <button
            {...props}
            className="w-full bg-brand-red text-white font-bold py-4 px-4 rounded-xl hover:bg-red-700 transition-colors duration-300 disabled:bg-brand-dark-2 disabled:text-brand-gray disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-dark focus:ring-brand-red"
        >
            {children}
        </button>
    );
};

export default Button;
