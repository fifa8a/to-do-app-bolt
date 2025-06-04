import React, { useState } from 'react';
import { CalendarIcon, Plus, X } from 'lucide-react';

interface TodoFormProps {
  onAdd: (text: string, dueDate: string | null, priority: 'low' | 'medium' | 'high') => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | ''>('');
  const [showPriorityAlert, setShowPriorityAlert] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim()) return;
    
    if (!priority) {
      setShowPriorityAlert(true);
      setTimeout(() => setShowPriorityAlert(false), 3000);
      return;
    }
    
    onAdd(text.trim(), dueDate || null, priority);
    setText('');
    setDueDate('');
    setPriority('');
    setShowDatePicker(false);
    setShowPriorityAlert(false);
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-6 animate-fade-in">
      <div className="rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg dark:bg-gray-800 dark:border dark:border-gray-700">
        <div className="flex items-center p-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 bg-transparent px-2 py-1 text-gray-800 outline-none placeholder:text-gray-400 dark:text-gray-200 dark:placeholder:text-gray-500"
            data-testid="new-todo-input"
          />
          
          <div className="flex items-center space-x-2">
            <select
              value={priority}
              onChange={(e) => {
                setPriority(e.target.value as 'low' | 'medium' | 'high');
                setShowPriorityAlert(false);
              }}
              className={`rounded-md border ${
                showPriorityAlert 
                  ? 'border-error-500 dark:border-error-400' 
                  : 'border-gray-300 dark:border-gray-600'
              } bg-white px-2 py-1 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-gray-200`}
              required
            >
              <option value="" disabled>Set Priority</option>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            
            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className={`rounded-full p-2 transition-colors ${
                showDatePicker 
                  ? 'bg-primary-100 text-primary-600 dark:bg-gray-700 dark:text-primary-400' 
                  : 'text-gray-400 hover:bg-gray-100 hover:text-primary-600 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-primary-400'
              }`}
              aria-label="Add due date"
            >
              <CalendarIcon size={18} />
            </button>
            
            <button
              type="submit"
              className="rounded-full bg-primary-600 p-2 text-white transition-colors hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600"
              aria-label="Add task"
              disabled={!text.trim()}
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
        
        {showPriorityAlert && (
          <div className="px-3 pb-2">
            <p className="text-sm text-error-500 dark:text-error-400">
              Please select a priority
            </p>
          </div>
        )}
        
        {showDatePicker && (
          <div className="border-t border-gray-100 p-3 dark:border-gray-700 animate-slide-in">
            <div className="flex items-center">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="flex-1 rounded-md border border-gray-300 bg-white p-2 text-gray-800 shadow-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <button
                type="button"
                onClick={() => {
                  setShowDatePicker(false);
                  setDueDate('');
                }}
                className="ml-2 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                aria-label="Clear due date"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default TodoForm;