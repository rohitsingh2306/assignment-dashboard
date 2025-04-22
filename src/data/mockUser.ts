// src/data/mockUsers.ts
export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export const mockUsers: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
    { id: 3, name: 'Charlie Davis', email: 'charlie@example.com' },
    { id: 4, name: 'Dana Lee', email: 'dana@example.com' },
    { id: 5, name: 'Evan Taylor', email: 'evan@example.com' },
  ];
  