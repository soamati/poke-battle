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

  const { origin } = req.headers;
  
  if (origin && !origin.startsWith("https")) {
    return options;
  }

  if (process.env.NODE_ENV === "prod") {
    options.domain = "pokebattle.fun";
  }

  options.secure = true;
  options.sameSite = "none";

  return options;
}
