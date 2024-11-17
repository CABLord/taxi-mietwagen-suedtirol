export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
}

const users: User[] = [];

export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const createUser = (user: Omit<User, 'id'>): User => {
  const newUser = { ...user, id: Date.now().toString() };
  users.push(newUser);
  return newUser;
};
