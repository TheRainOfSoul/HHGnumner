
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    title: string;
    showBackButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
    const navigate = useNavigate();

    return (
        <header className="flex items-center justify-center relative py-4 mb-4">
            {showBackButton && (
                <button onClick={() => navigate(-1)} className="absolute left-0 text-brand-light p-2">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            )}
            <h1 className="text-2xl font-bold text-brand-light">{title}</h1>
        </header>
    );
};
