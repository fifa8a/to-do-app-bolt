import React from 'react';
import Header from './components/Header';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilters from './components/TodoFilters';
import useTheme from './hooks/useTheme';
import useTodos from './hooks/useTodos';

function App() {
  const { theme, toggleTheme } = useTheme();
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

  return (
    <div className={`min-h-screen bg-gray-50 text-gray-900 transition-colors dark:bg-gray-900 dark:text-gray-100`}>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 md:py-12">
        <div className="rounded-xl bg-white p-6 shadow-lg transition-shadow dark:bg-gray-800 dark:shadow-none sm:p-8">
          <Header darkMode={theme === 'dark'} toggleDarkMode={toggleTheme} />
          
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