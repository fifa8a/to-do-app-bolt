import { nanoid } from 'nanoid';
import { Todo, FilterStatus } from '../types';

const STORAGE_KEY = 'taskflow-todos';

export const createTodo = (text: string, dueDate: string | null = null, priority: 'low' | 'medium' | 'high'): Todo => ({
  id: nanoid(),
  text,
  completed: false,
  createdAt: new Date().toISOString(),
  dueDate,
  priority,
});

export const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

export const loadTodos = (): Todo[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const filterTodos = (todos: Todo[], status: FilterStatus): Todo[] => {
  switch (status) {
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

const priorityWeight = {
  high: 3,
  medium: 2,
  low: 1,
};

export const sortTodos = (todos: Todo[]): Todo[] => {
  return [...todos].sort((a, b) => {
    // First sort by completed status (incomplete first)
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }

    // Then sort by priority
    if (a.priority !== b.priority) {
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    }

    // Then sort by due date if available (earlier dates first)
    if (a.dueDate && b.dueDate) {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }
    
    // Items with due dates come before items without due dates
    if (a.dueDate && !b.dueDate) return -1;
    if (!a.dueDate && b.dueDate) return 1;

    // Finally, sort by creation date (newer first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
};