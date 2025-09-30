import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ShoppingItem } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// Support new key name with fallback to the old one
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Отсутствуют переменные окружения Supabase');
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Интерфейсы для базы данных
export interface DatabaseShoppingItem {
  id: string;
  name: string;
  purchased: boolean;
  purchased_at?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export class ShoppingService {
  // Получить все товары пользователя
  static async getItems(userId: string): Promise<ShoppingItem[]> {
    const { data, error } = await supabase
      .from('shopping_items')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return data.map(item => ({
      id: item.id,
      name: item.name,
      purchased: item.purchased,
      purchasedAt: item.purchased_at || undefined,
    }));
  }

  // Добавить новый товар
  static async addItem(userId: string, name: string): Promise<ShoppingItem> {
    const { data, error } = await supabase
      .from('shopping_items')
      .insert([{
        name,
        purchased: false,
        user_id: userId,
      }])
      .select()
      .single();

    if (error) throw error;

    return {
      id: data.id,
      name: data.name,
      purchased: data.purchased,
      purchasedAt: data.purchased_at || undefined,
    };
  }

  // Обновить статус покупки
  static async toggleItem(userId: string, itemId: string): Promise<void> {
    // Сначала получить текущий статус
    const { data: currentItem, error: fetchError } = await supabase
      .from('shopping_items')
      .select('purchased')
      .eq('id', itemId)
      .eq('user_id', userId)
      .single();

    if (fetchError) throw fetchError;

    // Обновить статус
    const newPurchasedStatus = !currentItem.purchased;
    const { error } = await supabase
      .from('shopping_items')
      .update({
        purchased: newPurchasedStatus,
        purchased_at: newPurchasedStatus ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', itemId)
      .eq('user_id', userId);

    if (error) throw error;
  }

  // Удалить товар
  static async deleteItem(userId: string, itemId: string): Promise<void> {
    const { error } = await supabase
      .from('shopping_items')
      .delete()
      .eq('id', itemId)
      .eq('user_id', userId);

    if (error) throw error;
  }

  // Подписаться на изменения в реальном времени
  static subscribeToChanges(
    userId: string,
    callback: (items: ShoppingItem[]) => void
  ) {
    const subscription = supabase
      .channel('shopping_items_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'shopping_items',
          filter: `user_id=eq.${userId}`,
        },
        async () => {
          // Получить обновленные данные
          const items = await this.getItems(userId);
          callback(items);
        }
      )
      .subscribe();

    return subscription;
  }
}
