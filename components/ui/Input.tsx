
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
    return (
        <input
            {...props}
            className="w-full bg-brand-dark-2 border-2 border-brand-dark-2 text-brand-light placeholder-brand-gray px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-brand-red transition-colors duration-300"
        />
    );
};

export default Input;
