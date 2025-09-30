
import React from 'react';
import { ShoppingItem } from '../types';
import { useShoppingList } from '../context/ShoppingListContext';

interface ShoppingItemProps {
    item: ShoppingItem;
}

const ShoppingItemComponent: React.FC<ShoppingItemProps> = ({ item }) => {
    const { toggleItem, deleteItem } = useShoppingList();

    const handleToggle = () => {
        toggleItem(item.id);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent toggling when deleting
        deleteItem(item.id);
    };

    return (
        <div
            onClick={handleToggle}
            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all duration-300 mb-3 ${
                item.purchased ? 'bg-brand-dark-2 opacity-50' : 'bg-brand-dark-2 hover:bg-gray-700'
            }`}
        >
            <div className="flex items-center">
                <div className="relative flex items-center">
                    <input
                        type="checkbox"
                        checked={item.purchased}
                        onChange={handleToggle}
                        className="appearance-none h-6 w-6 border-2 border-brand-gray rounded-md checked:bg-brand-red checked:border-transparent focus:outline-none focus:ring-2 focus:ring-brand-red"
                    />
                    {item.purchased && (
                        <svg className="absolute left-0.5 top-0.5 h-5 w-5 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    )}
                </div>

                <span className={`ml-4 text-lg ${item.purchased ? 'line-through text-brand-gray' : 'text-brand-light'}`}>
                    {item.name}
                </span>
            </div>
            <button
                onClick={handleDelete}
                className="text-brand-gray hover:text-brand-red p-2 rounded-full transition-colors duration-200"
                aria-label={`Delete ${item.name}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default ShoppingItemComponent;
