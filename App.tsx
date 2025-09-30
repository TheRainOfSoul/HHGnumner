import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ShoppingListProvider } from './context/ShoppingListContext';
import ShoppingListPage from './pages/ShoppingListPage';
import AddItemPage from './pages/AddItemPage';
import HistoryPage from './pages/HistoryPage';

const App: React.FC = () => {
    return (
        <ShoppingListProvider>
            <Router>
                <div className="bg-brand-dark text-white font-sans h-screen w-screen max-w-md mx-auto flex flex-col">
                    <Routes>
                        <Route path="/list" element={<ShoppingListPage />} />
                        <Route path="/add" element={<AddItemPage />} />
                        <Route path="/history" element={<HistoryPage />} />
                        <Route path="*" element={<Navigate to="/list" replace />} />
                    </Routes>
                </div>
            </Router>
        </ShoppingListProvider>
    );
};

export default App;