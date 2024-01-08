export const _prod_ = process.env.NODE_ENV === "production";
export const _dev_ = process.env.NODE_ENV === "development";
export const db = process.env.DB!;
export const port = process.env.PORT!;
export const jwtSecret = process.env.JWT_SECRET!;
