import {
  AuthType,
  LoggedInUser,
  User,
  UserCreateInput,
} from "./../generated/graphql";
import UserModel from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwtSecret } from "../constants";
export const getUser = async (id: string): Promise<User | null> => {
  const user = await UserModel.findOne<User>({ _id: id });
  return user;
};

export const getUsers = async (): Promise<User[] | []> => {
  const users = await UserModel.find<User>({});
  return users;
};

export const createNewUser = async (args: {
  user: UserCreateInput;
}): Promise<User | Error> => {
  try {
    const newUser: Omit<User, "id" | "createdAt" | "isVerified" | "updatedAt"> =
      {
        ...args.user,
      };
    const userExists = await UserModel.findOne({
      email: newUser.email,
    });
    if (userExists) {
      throw new Error("user already exists");
    }
    const hasedPassword = await bcrypt.hash(args.user.password, 10);
    newUser.password = hasedPassword;
    newUser.authType = AuthType.Credentails;
    const user = (await UserModel.create(newUser)) as User;
    user.password = null;
    return user;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error on: (createNewUser) ", error.message);
      throw new Error(error.message);
    }
    throw new Error("user already exists");
  }
};

export const loginUser = async (
  email: string,
  password: string
): Promise<LoggedInUser> => {
  try {
    const userExists: User & { _doc: User } = (await UserModel.findOne({
      email,
      authType: AuthType.Credentails,
    })) as User & { _doc: User };
    if (!userExists) {
      throw new Error("user does not exists");
    }

    const isValidPassword = await bcrypt.compare(
      password,
      userExists.password!
    );
    if (!isValidPassword) {
      throw new Error("password is not correct!");
    }

    const token = await jwt.sign(
      { email: userExists.email, _id: userExists.id },
      jwtSecret
    );
    const user = {
      ...userExists._doc,
      token,
    };
    console.log("user", user);

    return user as LoggedInUser;
  } catch (error) {
    if (error instanceof Error) {
      console.log("error", error.message);
      throw new Error(error.message);
    }
    throw new Error("user does not exists");
  }
};
