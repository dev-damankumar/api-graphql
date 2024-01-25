import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";

export type GraphqlContextFunctionArgument = ExpressContextFunctionArgument & {
  auth: { _id: string; email: string } | null;
};

export type JWTPayload = {
  email: string;
  _id: string;
  iat: number;
} | null;
