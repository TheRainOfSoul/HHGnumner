import React from 'react';
import { useShoppingList } from '../context/ShoppingListContext';
import { Header } from '../components/Header';
import ShoppingItemComponent from '../components/ShoppingItemComponent';
import BottomNav from '../components/BottomNav';

const ShoppingListPage: React.FC = () => {
    const { items, loading } = useShoppingList();

    const unpurchasedItems = items.filter(item => !item.purchased);
    const purchasedItems = items.filter(item => item.purchased);

    const renderList = () => {
        if (loading) {
            return <div className="text-center text-brand-gray mt-10">Բեռնվում է...</div>;
        }

        if (items.length === 0) {
            return (
                <div className="text-center text-brand-gray mt-10">
                    <p className="text-lg">Ցուցակը դատարկ է</p>
                    <p className="mt-2">Սեղմեք նավիգացիոն տողի «Ավելացնել» կոճակը՝ ապրանք ավելացնելու համար</p>
                </div>
            );
        }

        return (
            <div>
                {unpurchasedItems.map(item => (
                    <ShoppingItemComponent key={item.id} item={item} />
                ))}
                {purchasedItems.length > 0 && unpurchasedItems.length > 0 && (
                     <hr className="border-brand-dark-2 my-4" />
                )}
                {purchasedItems.map(item => (
                    <ShoppingItemComponent key={item.id} item={item} />
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full">
            <Header title="Գնումների Ցուցակ" />
            <main className="flex-1 overflow-y-auto px-4 pb-20">
                {renderList()}
            </main>
            <BottomNav />
        </div>
    );
};

export default ShoppingListPage;