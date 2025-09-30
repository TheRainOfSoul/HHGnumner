
import React from 'react';
import { useShoppingList } from '../context/ShoppingListContext';
import { Header } from '../components/Header';
import BottomNav from '../components/BottomNav';
import { ShoppingItem } from '../types';

const HistoryPage: React.FC = () => {
    const { items, loading } = useShoppingList();

    const purchasedItems = items
        .filter(item => item.purchased && item.purchasedAt)
        .sort((a, b) => new Date(b.purchasedAt!).getTime() - new Date(a.purchasedAt!).getTime());

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        // Using a basic sortable format for grouping as locale might differ in sorting
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const formatDisplayDate = (dateString: string) => {
        const date = new Date(dateString);
         return date.toLocaleDateString('hy-AM', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
    
    const groupItemsByDate = (items: ShoppingItem[]) => {
        return items.reduce((acc, item) => {
            const date = formatDate(item.purchasedAt);
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(item);
            return acc;
        }, {} as Record<string, ShoppingItem[]>);
    };

    const groupedItems = groupItemsByDate(purchasedItems);
    const sortedDates = Object.keys(groupedItems).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());


    return (
        <div className="flex flex-col h-full">
            <Header title="Գնումների Պատմություն" />
            <main className="flex-1 overflow-y-auto px-4">
                {loading ? (
                    <div className="text-center text-brand-gray mt-10">Բեռնվում է...</div>
                ) : Object.keys(groupedItems).length === 0 ? (
                    <div className="text-center text-brand-gray mt-10">
                        <p className="text-lg">Պատմությունը դատարկ է</p>
                        <p className="mt-2">Դուք դեռ ոչինչ չեք գնել։</p>
                    </div>
                ) : (
                    sortedDates.map(date => (
                        <div key={date} className="mb-6">
                            <h2 className="text-brand-gray font-semibold text-sm mb-3 sticky top-0 bg-brand-dark py-2">{formatDisplayDate(date)}</h2>
                            <ul>
                                {groupedItems[date].map(item => (
                                    <li key={item.id} className="bg-brand-dark-2 p-4 rounded-lg mb-2 flex justify-between items-center">
                                        <span className="text-brand-light line-through">{item.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))
                )}
            </main>
            <BottomNav />
        </div>
    );
};

export default HistoryPage;
