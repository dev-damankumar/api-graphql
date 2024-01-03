import { User } from '../generated/graphql';

export const getUser = (id: string): User => {
  return {
    id,
    name: 'daman',
    email: 'daman@gmail.com',
    updatedAt: '10',
    createdAt: '10',
  };
};
