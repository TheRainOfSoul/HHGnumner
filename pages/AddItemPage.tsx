import React, { useState } from 'react';
import { useShoppingList } from '../context/ShoppingListContext';
import { Header } from '../components/Header';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import BottomNav from '../components/BottomNav';
import ShoppingItemComponent from '../components/ShoppingItemComponent';

const AddItemPage: React.FC = () => {
    const [itemName, setItemName] = useState('');
    const { items, addItem } = useShoppingList();

    const unpurchasedItems = items.filter(item => !item.purchased);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (itemName.trim()) {
            addItem(itemName.trim());
            setItemName('');
        }
    };

    return (
        <div className="flex flex-col h-full">
            <Header title="Ավելացնել ապրանք" />
            <main className="flex-1 overflow-y-auto px-4 pt-4 pb-20">
                <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                    <div>
                        <label htmlFor="itemName" className="block text-sm font-medium text-brand-gray mb-2">
                            Ապրանքի անվանումը
                        </label>
                        <Input
                            id="itemName"
                            type="text"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                            placeholder="Օրինակ՝ Կաթ"
                            autoFocus
                        />
                    </div>
                    <Button type="submit" disabled={!itemName.trim()}>
                        Ավելացնել ցուցակում
                    </Button>
                </form>

                <div>
                    {unpurchasedItems.length > 0 && (
                        <h2 className="text-brand-gray text-sm font-semibold mb-3">Դեռ չգնված</h2>
                    )}
                    {unpurchasedItems.map(item => (
                        <ShoppingItemComponent key={item.id} item={item} />
                    ))}
                </div>
            </main>
            <BottomNav />
        </div>
    );
};

export default AddItemPage;