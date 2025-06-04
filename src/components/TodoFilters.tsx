import React from 'react';
import { FilterStatus } from '../types';

interface TodoFiltersProps {
  activeFilter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  counts: {
    total: number;
    active: number;
    completed: number;
  };
  onClearCompleted: () => void;
}

const TodoFilters: React.FC<TodoFiltersProps> = ({ 
  activeFilter, 
  onFilterChange,
  counts,
  onClearCompleted
}) => {
  return (
    <div className="mb-6 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 animate-fade-in">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onFilterChange('active')}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            activeFilter === 'active'
              ? 'bg-primary-600 text-white dark:bg-primary-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          To-do
          {counts.active > 0 && (
            <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white bg-opacity-20 text-xs">
              {counts.active}
            </span>
          )}
        </button>
        
        <button
          onClick={() => onFilterChange('completed')}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            activeFilter === 'completed'
              ? 'bg-primary-600 text-white dark:bg-primary-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          Completed
          {counts.completed > 0 && (
            <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white bg-opacity-20 text-xs">
              {counts.completed}
            </span>
          )}
        </button>

        <button
          onClick={() => onFilterChange('all')}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            activeFilter === 'all'
              ? 'bg-primary-600 text-white dark:bg-primary-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          All
          {counts.total > 0 && (
            <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-white bg-opacity-20 text-xs">
              {counts.total}
            </span>
          )}
        </button>
      </div>
      
      {counts.completed > 0 && (activeFilter === 'all' || activeFilter === 'completed') && (
        <button
          onClick={onClearCompleted}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          Clear completed
        </button>
      )}
    </div>
  );
};

export default TodoFilters;