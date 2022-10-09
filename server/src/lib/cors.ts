import corsMiddleware from "cors";

export function cors() {
  return corsMiddleware({
    origin: [
      "https://studio.apollographql.com",
      process.env.WEB || "http://localhost:3000",
    ],
    credentials: true,
  });
}
