import { getUser } from '../../../controller/user.controller';

const userQueries = {
  users: async () => {
    return [{}];
  },
  user: async (_: any, args: { id: string }) => {
    try {
      return getUser(args.id);
    } catch (e) {
      throw Error('Can not find user');
    }
  },
};

export default userQueries;
