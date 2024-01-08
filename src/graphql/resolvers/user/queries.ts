import {
  getUser,
  getUsers,
  loginUser,
} from "../../../controller/user.controller";
import { User } from "../../../generated/graphql";

const userQueries = {
  users: async () => {
    return await getUsers();
  },
  user: async (_: any, args: { id: string }) => {
    return await getUser(args.id);
  },
  login: async (
    _: any,
    args: { email: string; password: string }
  ): Promise<User> => {
    return await loginUser(args.email, args.password);
  },
};

export default userQueries;
