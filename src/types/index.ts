export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  dueDate: string | null;
  priority: 'low' | 'medium' | 'high';
}

export type FilterStatus = 'all' | 'active' | 'completed';