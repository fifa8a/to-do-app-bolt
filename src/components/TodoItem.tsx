import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { 
  CheckCircle, Circle, Trash, Edit, Calendar, X, Save
} from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  index: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, updates: Partial<Todo>) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ 
  todo, 
  index, 
  onToggle, 
  onDelete,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');
  const [editPriority, setEditPriority] = useState(todo.priority);
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);
  
  const handleEditSubmit = () => {
    if (editText.trim()) {
      onEdit(todo.id, { 
        text: editText.trim(),
        dueDate: editDueDate || null,
        priority: editPriority
      });
      setIsEditing(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(todo.text);
      setEditDueDate(todo.dueDate || '');
      setEditPriority(todo.priority);
    }
  };
  
  const formatDueDate = (dateString: string | null) => {
    if (!dateString) return null;
    return format(new Date(dateString), 'MMM d, yyyy');
  };
  
  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high': return 'text-error-500 dark:text-error-400';
      case 'medium': return 'text-warning-500 dark:text-warning-400';
      case 'low': return 'text-success-500 dark:text-success-400';
    }
  };
  
  return (
    <li className="group relative mb-2 rounded-lg border bg-white p-4 shadow-sm transition-all dark:bg-gray-800 dark:border-gray-700">
      {isEditing ? (
        <div className="flex flex-col space-y-2">
          <input
            ref={inputRef}
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-md border-gray-300 bg-white p-2 text-gray-800 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            placeholder="Update task..."
          />
          <div className="flex items-center space-x-2">
            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
              className="flex-1 rounded-md border-gray-300 bg-white p-2 text-gray-800 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="rounded-md border-gray-300 bg-white p-2 text-gray-800 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <div className="flex space-x-2 justify-end">
            <button
              onClick={() => {
                setIsEditing(false);
                setEditText(todo.text);
                setEditDueDate(todo.dueDate || '');
                setEditPriority(todo.priority);
              }}
              className="flex items-center rounded-md bg-gray-200 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              <X size={16} className="mr-1" /> Cancel
            </button>
            <button
              onClick={handleEditSubmit}
              className="flex items-center rounded-md bg-primary-600 px-3 py-1.5 text-sm text-white transition-colors hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600"
            >
              <Save size={16} className="mr-1" /> Save
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start">
            <button
              onClick={() => onToggle(todo.id)}
              className={`mr-3 flex-shrink-0 mt-0.5 transition-colors ${
                todo.completed 
                  ? 'text-accent-500 hover:text-accent-600'
                  : 'text-gray-400 hover:text-primary-500 dark:text-gray-500 dark:hover:text-primary-400'
              }`}
              aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
            >
              {todo.completed ? (
                <CheckCircle size={20} />
              ) : (
                <Circle size={20} />
              )}
            </button>
            <div className="flex-1">
              <div className="relative flex items-center">
                <p className={`text-gray-800 dark:text-gray-200 pr-8 ${todo.completed ? 'line-through text-gray-500 dark:text-gray-500' : ''}`}>
                  {todo.text}
                </p>
                <span className={`ml-2 text-sm font-medium ${getPriorityColor(todo.priority)}`}>
                  {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                </span>
                {todo.completed && (
                  <div 
                    className="absolute bottom-0 left-0 h-[1px] bg-gray-400 dark:bg-gray-500 animate-task-complete" 
                    style={{width: '100%'}}
                  />
                )}
              </div>
              {todo.dueDate && (
                <div className="mt-1 flex items-center text-xs text-gray-500 dark:text-gray-400">
                  <Calendar size={12} className="mr-1" />
                  <span>
                    {formatDueDate(todo.dueDate)}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="absolute right-4 top-4 flex opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => setIsEditing(true)}
              className="mr-2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-primary-500 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-primary-400"
              aria-label="Edit task"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-error-500 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-error-400"
              aria-label="Delete task"
            >
              <Trash size={16} />
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;