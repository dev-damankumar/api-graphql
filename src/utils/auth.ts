import { Request } from "express";
export const getTokenFromHeaders = (req: Request) => {
  const authorization = req.headers.authorization || "";
  return authorization?.split(" ")[1]?.trim();
};
