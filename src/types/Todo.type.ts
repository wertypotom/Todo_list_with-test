export type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export type Filters = 'All' | 'Active' | 'Completed';
