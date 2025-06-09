import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import { AuthPage } from './components/auth/AuthPage';
import { SubscriptionCard } from './components/subscription/SubscriptionCard';
import { SuccessPage } from './components/SuccessPage';
import useTheme from './hooks/useTheme';
import useTodos from './hooks/useTodos';
import { useAuth } from './hooks/useAuth';
import { User, Settings, LogOut } from 'lucide-react';

function App() {
  const { theme, toggleTheme } = useTheme();
  const { user, loading: authLoading, signOut } = useAuth();
  const [showSubscription, setShowSubscription] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    todos,
    filter,
    counts,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
  } = useTodos();

  // Check for success parameter in URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setShowSuccess(true);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setShowSubscription(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  if (showSuccess) {
    return <SuccessPage onBackToApp={() => setShowSuccess(false)} />;
  }

  if (showSubscription) {
    return (
      <div className={`min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100`}>
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 md:py-12">
          <div className="mb-6">
            <button
              onClick={() => setShowSubscription(false)}
              className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              ← Back to Tasks
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <User className="text-primary-600 dark:text-primary-500 mr-2" size={24} />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Account</h2>
                </div>
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <LogOut size={16} className="mr-1" />
                  Sign Out
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Signed in as: <span className="font-medium">{user.email}</span>
              </p>
            </div>
            
            <SubscriptionCard />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100`}>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 md:py-12">
        <div className="rounded-xl bg-white p-6 shadow-lg transition-shadow dark:bg-gray-800 dark:shadow-none sm:p-8">
          <div className="flex items-center justify-between mb-8">
            <Header darkMode={theme === 'dark'} toggleDarkMode={toggleTheme} />
            <button
              onClick={() => setShowSubscription(true)}
              className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              aria-label="Account settings"
            >
              <Settings size={20} />
            </button>
          </div>
          
          <main>
            <TodoForm onAdd={addTodo} />
            
            <TodoFilters
              activeFilter={filter}
              onFilterChange={setFilter}
              counts={counts}
              onClearCompleted={clearCompleted}
            />
            
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;