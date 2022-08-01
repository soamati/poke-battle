import corsMiddleware from "cors";

export function cors() {
  return corsMiddleware({
    origin: ["https://studio.apollographql.com"],
    credentials: true,
  });
}
