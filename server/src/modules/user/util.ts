import { CookieOptions } from "express";
import { sign } from "jsonwebtoken";

export function createAccessToken(payload: any) {
  const token = sign(payload, process.env.SECRET as string, {
    expiresIn: "1 day",
  });

  return token;
}

export const cookieOptions: CookieOptions = {
  maxAge: 1000 * 60 * 60 * 24, // 1 day
  httpOnly: true,
  secure: true,
  sameSite: "none",
};
