import { createNewUser } from "../../../controller/user.controller";
import { UserCreateInput } from "../../../generated/graphql";

const userMutations = {
  createUser: async (_: any, args: { user: UserCreateInput }) => {
    return await createNewUser(args);
  },
  updateUser: async () => {},
};

export default userMutations;
