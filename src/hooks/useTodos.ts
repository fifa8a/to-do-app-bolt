import { useState, useCallback, useMemo } from 'react';
import { Todo, FilterStatus } from '../types';
import useLocalStorage from './useLocalStorage';
import { createTodo, filterTodos, sortTodos } from '../utils/todoUtils';

export default function useTodos() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('taskflow-todos', []);
  const [filter, setFilter] = useState<FilterStatus>('active');
  
  const addTodo = useCallback((text: string, dueDate: string | null = null, priority: 'low' | 'medium' | 'high' = 'low') => {
    setTodos((prev) => [...prev, createTodo(text, dueDate, priority)]);
  }, [setTodos]);
  
  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) => 
      prev.map((todo) => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [setTodos]);
  
  const editTodo = useCallback((id: string, updates: Partial<Todo>) => {
    setTodos((prev) => 
      prev.map((todo) => 
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  }, [setTodos]);
  
  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, [setTodos]);
  
  const clearCompleted = useCallback(() => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  }, [setTodos]);

  const filteredAndSortedTodos = useMemo(() => {
    return sortTodos(filterTodos(todos, filter));
  }, [todos, filter]);
  
  const counts = useMemo(() => {
    return {
      total: todos.length,
      active: todos.filter(todo => !todo.completed).length,
      completed: todos.filter(todo => todo.completed).length
    };
  }, [todos]);

  return {
    todos: filteredAndSortedTodos,
    filter,
    counts,
    addTodo,
    toggleTodo,
    editTodo,
    deleteTodo,
    clearCompleted,
    setFilter,
  };
}