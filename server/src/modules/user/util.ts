import { CookieOptions, Request } from "express";
import { sign } from "jsonwebtoken";

export function createAccessToken(payload: any) {
  const token = sign(payload, process.env.SECRET as string, {
    expiresIn: "1 day",
  });

  return token;
}

export function cookieOptions(req: Request): CookieOptions {
  const options: CookieOptions = {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true,
  };

  if (req.headers.origin?.startsWith("https")) {
    options.secure = true;
    options.sameSite = "none";
  }

  return options;
}
