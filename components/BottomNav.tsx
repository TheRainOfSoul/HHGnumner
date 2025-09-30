import React from 'react';
import { NavLink } from 'react-router-dom';

const BottomNav: React.FC = () => {
    const activeLinkClass = 'text-brand-red';
    const inactiveLinkClass = 'text-brand-gray hover:text-brand-light';

    return (
        <nav className="bg-brand-dark-2 sticky bottom-0 w-full px-8 py-4 border-t border-brand-dark-2 shadow-lg">
            <div className="flex justify-around items-center">
                <NavLink 
                    to="/list" 
                    className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} transition-colors duration-200 flex flex-col items-center`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                    <span className="text-xs font-medium">Ցուցակ</span>
                </NavLink>

                <NavLink 
                    to="/add" 
                    className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} transition-colors duration-200 flex flex-col items-center`}
                >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-medium">Ավելացնել</span>
                </NavLink>

                <NavLink 
                    to="/history" 
                    className={({ isActive }) => `${isActive ? activeLinkClass : inactiveLinkClass} transition-colors duration-200 flex flex-col items-center`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-medium">Պատմություն</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default BottomNav;