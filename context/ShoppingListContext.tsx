import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ShoppingItem } from '../types';
import { ShoppingService } from '../services/shoppingService';
import { supabase } from '../services/shoppingService';

interface ShoppingListContextType {
    items: ShoppingItem[];
    addItem: (name: string) => Promise<void>;
    toggleItem: (id: string) => Promise<void>;
    deleteItem: (id: string) => Promise<void>;
    loading: boolean;
    user: any; // Supabase user object
}

const ShoppingListContext = createContext<ShoppingListContextType | undefined>(undefined);

export const ShoppingListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<ShoppingItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const getCurrentUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                try {
                    const userItems = await ShoppingService.getItems(user.id);
                    setItems(userItems);
                } catch (error) {
                    console.error('Ошибка загрузки товаров:', error);
                }
            }
            setLoading(false);
        };

        getCurrentUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                setUser(session?.user ?? null);
                if (session?.user) {
                    const userItems = await ShoppingService.getItems(session.user.id);
                    setItems(userItems);
                } else {
                    setItems([]);
                }
                setLoading(false);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;

        const subscription = ShoppingService.subscribeToChanges(user.id, (updatedItems) => {
            setItems(updatedItems);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [user]);

    const addItem = async (name: string) => {
        if (!user) {
            throw new Error('Пользователь не аутентифицирован');
        }

        try {
            const newItem = await ShoppingService.addItem(user.id, name);
            // Обновление состояния произойдет автоматически через real-time подписку
        } catch (error) {
            console.error('Ошибка добавления товара:', error);
            throw error;
        }
    };

    const toggleItem = async (id: string) => {
        if (!user) {
            throw new Error('Пользователь не аутентифицирован');
        }

        try {
            await ShoppingService.toggleItem(user.id, id);
            // Обновление состояния произойдет автоматически через real-time подписку
        } catch (error) {
            console.error('Ошибка обновления товара:', error);
            throw error;
        }
    };

    const deleteItem = async (id: string) => {
        if (!user) {
            throw new Error('Пользователь не аутентифицирован');
        }

        try {
            await ShoppingService.deleteItem(user.id, id);
            // Обновление состояния произойдет автоматически через real-time подписку
        } catch (error) {
            console.error('Ошибка удаления товара:', error);
            throw error;
        }
    };

    return (
        <ShoppingListContext.Provider value={{ items, addItem, toggleItem, deleteItem, loading, user }}>
            {children}
        </ShoppingListContext.Provider>
    );
};

export const useShoppingList = (): ShoppingListContextType => {
    const context = useContext(ShoppingListContext);
    if (!context) {
        throw new Error('useShoppingList должен использоваться внутри ShoppingListProvider');
    }
    return context;
};
